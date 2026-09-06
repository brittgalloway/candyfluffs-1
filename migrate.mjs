/**
 * DatoCMS → Sanity Migration Script
 *
 * Usage:
 *   node migrate.mjs
 *
 * Required env vars (in .env.development):
 *   API_TOKEN                     — DatoCMS read-only API token
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_TOKEN              — Sanity token with write permissions
 */

import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.development' });

// ─── Clients ─────────────────────────────────────────────────────────────────

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function datoRequest(query) {
  const res = await fetch('https://graphql.datocms.com/', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors, null, 2));
  return json.data;
}

// ─── Image upload with deduplication ─────────────────────────────────────────

// In-memory cache for this run
const uploadCache = new Map();

// Check if a Sanity asset with this filename already exists
async function findExistingAsset(filename) {
  const results = await sanity.fetch(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]{ _id }`,
    { filename }
  );
  return results?._id ?? null;
}

async function uploadImageToSanity(url, alt = '') {
  if (!url) return null;
  if (uploadCache.has(url)) {
    console.log(`  ↩ cached: ${url}`);
    return uploadCache.get(url);
  }

  const filename = url.split('/').pop().split('?')[0] || 'image.jpg';

  // Check if already uploaded to Sanity
  const existingId = await findExistingAsset(filename);
  if (existingId) {
    console.log(`  ✓ exists: ${filename}`);
    const result = {
      _type: 'image',
      asset: { _type: 'reference', _ref: existingId },
      alt,
    };
    uploadCache.set(url, result);
    return result;
  }

  console.log(`  ↑ uploading: ${filename}`);
  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`  ✗ failed to fetch: ${url}`);
    return null;
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  const asset = await sanity.assets.upload('image', buffer, {
    filename,
    contentType: res.headers.get('content-type') ?? 'image/jpeg',
  });

  const result = {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
    alt,
  };

  uploadCache.set(url, result);
  return result;
}

// ─── DAST → Portable Text ─────────────────────────────────────────────────────

function dastToPortableText(dastValue) {
  if (!dastValue?.document?.children) return [];
  return dastValue.document.children
    .map((node) => {
      if (node.type === 'paragraph') {
        return {
          _type: 'block',
          _key: Math.random().toString(36).slice(2),
          style: 'normal',
          children: (node.children ?? []).map((child) => ({
            _type: 'span',
            _key: Math.random().toString(36).slice(2),
            text: child.value ?? '',
            marks: [],
          })),
          markDefs: [],
        };
      }
      if (node.type === 'heading') {
        return {
          _type: 'block',
          _key: Math.random().toString(36).slice(2),
          style: `h${node.level ?? 2}`,
          children: (node.children ?? []).map((child) => ({
            _type: 'span',
            _key: Math.random().toString(36).slice(2),
            text: child.value ?? '',
            marks: [],
          })),
          markDefs: [],
        };
      }
      return null;
    })
    .filter(Boolean);
}

// ─── Migrate fandoms (must run before products) ───────────────────────────────

async function migrateFandoms(products) {
  console.log('\n── Fandoms ──────────────────────────────────────────');

  // Collect unique fandom names from all products
  const uniqueFandoms = [...new Set(
    products
      .map((p) => p.fandoms)
      .filter(Boolean)
  )];

  console.log(`  found ${uniqueFandoms.length} unique fandoms`);

  // Map of fandom name → Sanity _id for use in product migration
  const fandomRefMap = new Map();

  for (const name of uniqueFandoms) {
    const id = `imported-fandom-${name.toLowerCase().replaceAll(' ', '-')}`;
    await sanity.createOrReplace({
      _type: 'fandom',
      _id: id,
      name,
    });
    fandomRefMap.set(name, id);
    console.log(`  ✓ ${name}`);
  }

  return fandomRefMap;
}

// ─── Migrate products ─────────────────────────────────────────────────────────

async function migrateProducts() {
  console.log('\n── Products ─────────────────────────────────────────');

  let allProducts = [];
  let skip = 0;
  const pageSize = 100;

  while (true) {
    const data = await datoRequest(`
      query {
        allProducts(first: ${pageSize}, skip: ${skip}) {
          id title slug price weight size fandoms productType
          description(markdown: false)
          image { url alt }
          variation {
            id title price size weight
            image { url alt }
          }
        }
      }
    `);
    allProducts = allProducts.concat(data.allProducts);
    if (data.allProducts.length < pageSize) break;
    skip += pageSize;
  }

  console.log(`  found ${allProducts.length} products`);

  // Create fandom documents first and get the reference map
  const fandomRefMap = await migrateFandoms(allProducts);

  console.log('\n── Importing products ───────────────────────────────');

  for (const product of allProducts) {
    console.log(`\n  → ${product.title}`);

    const productImages = [];
    for (const img of product.image ?? []) {
      const uploaded = await uploadImageToSanity(img.url, img.alt);
      if (uploaded) productImages.push(uploaded);
    }

    const variations = [];
    for (const v of product.variation ?? []) {
      const varImage = v.image?.url
        ? await uploadImageToSanity(v.image.url, v.image.alt)
        : null;
      variations.push({
        _type: 'object',
        _key: v.id,
        title: v.title,
        price: v.price,
        size: v.size ?? '',
        weight: v.weight ?? 0,
        ...(varImage ? { image: varImage } : {}),
      });
    }

    const descriptionBlocks = product.description
      ? product.description.split('\n\n').filter(Boolean).map((para) => ({
          _type: 'block',
          _key: Math.random().toString(36).slice(2),
          style: 'normal',
          children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), text: para.replace(/[#*_]/g, ''), marks: [] }],
          markDefs: [],
        }))
      : [];

    // Build fandom reference if we have one
    const fandomId = product.fandoms ? fandomRefMap.get(product.fandoms) : null;
    const fandomField = fandomId
      ? { fandoms: { _type: 'reference', _ref: fandomId } }
      : {};

    const doc = {
      _type: 'product',
      _id: `imported-product-${product.id}`,
      title: product.title,
      slug: { _type: 'slug', current: product.slug },
      price: product.price,
      weight: product.weight ?? 0,
      size: product.size ?? '',
      productType: product.productType ?? '',
      description: descriptionBlocks,
      productImages,
      variation: variations,
      ...fandomField,
    };

    await sanity.createOrReplace(doc);
    console.log(`  ✓ ${product.title}`);
  }
}

// ─── Migrate banners ──────────────────────────────────────────────────────────

async function migrateBanners() {
  console.log('\n── Banners ──────────────────────────────────────────');
  const data = await datoRequest(`
    query {
      allBanners {
        id
        banner { url alt }
        link { value }
      }
    }
  `);

  for (const [i, banner] of data.allBanners.entries()) {
    console.log(`\n  → banner ${i + 1}`);
    const imgUrl = banner.banner?.[0]?.url;
    const imgAlt = banner.banner?.[0]?.alt ?? '';
    const link = banner.link?.value?.document?.children?.[0]?.children?.[0]?.url ?? '';

    const uploaded = await uploadImageToSanity(imgUrl, imgAlt);
    if (!uploaded) continue;

    await sanity.createOrReplace({
      _type: 'banner',
      _id: `imported-banner-${banner.id}`,
      image: uploaded,
      link,
      order: i,
    });
    console.log(`  ✓ banner ${i + 1}`);
  }
}

// ─── Migrate events ───────────────────────────────────────────────────────────

async function migrateEvents() {
  console.log('\n── Events ───────────────────────────────────────────');
  const data = await datoRequest(`
    query {
      allLiveEvents {
        id eventName startDate endDate website address
      }
    }
  `);

  for (const event of data.allLiveEvents) {
    await sanity.createOrReplace({
      _type: 'liveEvent',
      _id: `imported-event-${event.id}`,
      eventName: event.eventName,
      startDate: event.startDate,
      endDate: event.endDate,
      website: event.website ?? '',
      address: event.address ?? '',
    });
    console.log(`  ✓ ${event.eventName}`);
  }
}

// ─── Migrate about me ─────────────────────────────────────────────────────────

async function migrateAboutMe() {
  console.log('\n── About Me ─────────────────────────────────────────');
  const data = await datoRequest(`
    query {
      aboutMe {
        bio { value }
        bioImage { url alt }
      }
    }
  `);

  const { aboutMe } = data;
  const bioImage = await uploadImageToSanity(aboutMe.bioImage?.url, aboutMe.bioImage?.alt ?? '');

  await sanity.createOrReplace({
    _type: 'aboutMe',
    _id: 'singleton-aboutme',
    bio: dastToPortableText(aboutMe.bio?.value),
    ...(bioImage ? { bioImage } : {}),
  });
  console.log('  ✓ about me');
}

// ─── Migrate necahual ─────────────────────────────────────────────────────────

async function migrateNecahual() {
  console.log('\n── Necahual ─────────────────────────────────────────');
  const data = await datoRequest(`
    query {
      necahual {
        pageTitle
        patreonDisclaimer
        summary { value }
        necahualImage { url alt }
      }
    }
  `);

  const { necahual } = data;
  const necahualImage = await uploadImageToSanity(necahual.necahualImage?.url, necahual.necahualImage?.alt ?? '');

  await sanity.createOrReplace({
    _type: 'necahual',
    _id: 'singleton-necahual',
    pageTitle: necahual.pageTitle,
    patreonDisclaimer: necahual.patreonDisclaimer ?? '',
    summary: dastToPortableText(necahual.summary?.value),
    ...(necahualImage ? { necahualImage } : {}),
  });
  console.log('  ✓ necahual');
}

// ─── Migrate links ────────────────────────────────────────────────────────────

async function migrateLinks() {
  console.log('\n── Links ────────────────────────────────────────────');
  const data = await datoRequest(`
    query {
      allLinkPages {
        id label url
      }
    }
  `);

  for (const [i, link] of data.allLinkPages.entries()) {
    await sanity.createOrReplace({
      _type: 'linkPage',
      _id: `imported-link-${link.id}`,
      label: link.label,
      url: link.url,
      order: i,
    });
    console.log(`  ✓ ${link.label}`);
  }
}

// ─── Run ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('Starting DatoCMS → Sanity migration...\n');

  const missing = [
    'API_TOKEN',
    'NEXT_PUBLIC_SANITY_PROJECT_ID',
    'NEXT_PUBLIC_SANITY_DATASET',
    'SANITY_API_TOKEN',
  ].filter((k) => !process.env[k]);

  if (missing.length) {
    console.error('Missing env vars:', missing.join(', '));
    process.exit(1);
  }

  try {
    await migrateProducts(); // also runs migrateFandoms internally
    await migrateBanners();
    await migrateEvents();
    await migrateAboutMe();
    await migrateNecahual();
    await migrateLinks();
    console.log('\n✓ Migration complete!');
  } catch (err) {
    console.error('\n✗ Migration failed:', err);
    process.exit(1);
  }
}

main();
