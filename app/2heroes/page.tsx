import Image from 'next/image';
import { sanityClient, urlFor, limit } from '@/lib/sanity';
import { Product, SearchParams } from '@/lib/types';
import { PortableText } from '@portabletext/react';
import { FaInstagram, FaXTwitter, FaPatreon } from '@/components/icons';
import { ProductItem } from '@/components/productItem';
import Pagination from '@/components/pagination';
import styles from './page.module.scss';

export const metadata = {
  title: 'Candy Fluffs | Necahual',
  description: "Necahual is the mesoamerican magical girl series you've been waiting for.",
  robots: { index: true, follow: true, nocache: true },
};

const socialMedia = [
  { href: 'https://www.patreon.com/2heroes', label: "Link to 2Heroes' Patreon", Icon: FaPatreon },
  { href: 'https://www.instagram.com/2.heroes/', label: "Link to 2Heroes' Instagram", Icon: FaInstagram },
  { href: 'https://twitter.com/2Heroes1/', label: "Link to 2Heroes' X", Icon: FaXTwitter },
];

export default async function TwoHeroes({ searchParams }: SearchParams) {
  try {
    const { page } = await searchParams;
    const pageNumber = Number.parseInt(page ?? '1');
    const skip = pageNumber > 1 ? limit * (pageNumber - 1) : 0;

    const [necahual, products, total] = await Promise.all([
      sanityClient.fetch(`
        *[_type == "necahual"][0] {
          pageTitle, summary, patreonDisclaimer,
          necahualImage{ asset, alt }
        }
      `),
      sanityClient.fetch<Product[]>(`
        *[_type == "product" && fandoms == "Necahual"] | order(_createdAt desc) [$skip...$end] {
          _id, title, price, slug,
          image[]{ asset, alt }
        }
      `, { skip, end: skip + limit }),
      sanityClient.fetch<number>(`count(*[_type == "product" && fandoms == "Necahual"])`),
    ]);

    return (
      <>
        <section className={styles.grid}>
          <h1 className={`${styles.span3mobile} ${styles.title}`}>{necahual?.pageTitle}</h1>
          <Image
            className={styles.span3mobile}
            alt={necahual?.necahualImage?.alt ?? ''}
            src={urlFor(necahual.necahualImage.asset).width(500).url()}
            width={500}
            height={500}
          />
          <h2 className={`${styles.span3mobile} ${styles.necahual} ${styles.alignCenter}`}>
            Read it on <a className={styles.webtoons} href="https://www.webtoons.com/en/canvas/necahual/list?title_no=216820">Webtoons</a>!
          </h2>
          <div className={`${styles.span3mobile} ${styles.necahual}`}>
            <PortableText value={necahual.summary} />
          </div>
          <h2 className={`${styles.span3mobile} ${styles.necahual} ${styles.alignCenter}`}>Support us on:</h2>
          {socialMedia.map((link) => (
            <a key={link.href} href={link.href} aria-label={link.label}>
              <link.Icon size={20} />
            </a>
          ))}
          <p className={`${styles.span3mobile} ${styles.necahual}`}><small>{necahual?.patreonDisclaimer}</small></p>
        </section>
        <section className={styles.merchSection}>
          <h1 className={styles.title} id="products">Merch</h1>
          <div className="products">
            {products.map((product: Product) => (
              <ProductItem
                key={product._id}
                id={product._id}
                title={product.title}
                slug={product.slug.current}
                url={urlFor(product.image[0].asset).width(500).url()}
                alt={product.image[0].alt}
                price={product.price}
              />
            ))}
          </div>
          <Pagination numberOfProducts={total} currentPage={pageNumber} maxItems={limit} />
        </section>
      </>
    );
  } catch {
    return (
      <div>
        <h2 id="errorH2">Taking a Short break!</h2>
        <p id="errorMessage">Check back soon!</p>
      </div>
    );
  }
}