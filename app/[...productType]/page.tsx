import { sanityClient, urlFor, limit } from '@/lib/sanity';
import { Product } from '@/lib/types';
import { ProductItem } from '@/components/productItem';
import Dropdown from '@/components/dropdown';
import Pagination from '@/components/pagination';
import ErrorFallback from '@/components/errorFallback';

type ParamTypes = {
  params: Promise<{ productType: string[] }>;
  searchParams: Promise<{ page?: string }>;
}

type ProductMediaItem = {
  _type: 'image' | 'file';
  alt?: string;
  asset: { _ref?: string; url?: string };
};

const productTypes = ['Book', 'Print', 'Scroll', 'Charm', 'Button', 'Sticker'];

function getCardImageUrl(media: ProductMediaItem[]): string {
  if (!media?.length) return '';
  const first = media[0];
  if (first.asset?.url) return first.asset.url;
  return urlFor(first.asset).width(500).url() ?? '';
}

function getCardImageAlt(media: ProductMediaItem[]): string {
  return media?.[0]?.alt ?? '';
}

export default async function ProductsByType({ params, searchParams }: ParamTypes) {
  try {
    const { page } = await searchParams;
    const pageNumber = Number.parseInt(page ?? '1');
    const { productType } = await params;
    const skip = pageNumber > 1 ? limit * (pageNumber - 1) : 0;

    let productTypeParam: string;
    let category: string;

    if (productType.length > 1) {
      productTypeParam = productType[0];
      category = productType[1].replaceAll('-', ' ');
    } else if (productTypes.includes(productType[0])) {
      productTypeParam = productType[0];
      category = '';
    } else {
      productTypeParam = '';
      category = productType[0].replaceAll('-', ' ');
    }

    const isTypePage = productTypes.includes(productType[0]);

    const typeFilter = productTypeParam ? `productType == "${productTypeParam}"` : '';
    const categoryFilter = category ? `fandoms->name == "${category}"` : '';
    const filters = [typeFilter, categoryFilter].filter(Boolean).join(' && ');
    const where = filters ? `&& ${filters}` : '';

    const [products, total, allFandomProducts] = await Promise.all([
      sanityClient.fetch<(Product & { productImages: ProductMediaItem[] })[]>(`
        *[_type == "product" ${where}] | order(_createdAt desc) [$skip...$end] {
          _id, title, price, slug, fandoms,
          productImages[0..0]{
            _type,
            alt,
            asset->{ _ref, url }
          }
        }
      `, { skip, end: skip + limit }),

      sanityClient.fetch<number>(`count(*[_type == "product" ${where}])`),

      isTypePage
        ? sanityClient.fetch<Array<{ fandoms: { name: string } }>>(`
            *[_type == "product" && productType == $productTypeParam] {
              fandoms->{ name }
            }
          `, { productTypeParam })
        : Promise.resolve([]),
    ]);

    const fandomList: string[] = [];
    allFandomProducts.forEach((item) => {
      const name = item.fandoms?.name;
      if (name && !fandomList.includes(name)) {
        fandomList.push(name);
      }
    });

    return (
      <>
        {isTypePage && (
          <Dropdown
            type={productTypeParam}
            fandomList={fandomList}
            activeCategory={category}
          />
        )}
        <div className="products" id="products">
          {products.map((product) => (
            <ProductItem
              key={product._id}
              id={product._id}
              title={product.title}
              slug={product.slug.current}
              url={getCardImageUrl(product.productImages)}
              alt={getCardImageAlt(product.productImages)}
              price={product.price}
            />
          ))}
        </div>
        <Pagination
          numberOfProducts={total}
          currentPage={pageNumber}
          maxItems={limit}
        />
      </>
    );
  } catch (error) {
    console.error('Error fetching page:', error);
    return <ErrorFallback />;
  }
}