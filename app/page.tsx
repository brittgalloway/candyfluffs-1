import { sanityClient, urlFor, limit } from '@/lib/sanity';
import { Product, Banner, SearchParams } from '@/lib/types';
import { EmblaOptionsType } from 'embla-carousel';
import { ProductItem } from '@/components/productItem';
import Slider from '@/components/slider';
import Pagination from '@/components/pagination';
import ErrorFallback from '@/components/errorFallback';

export default async function Home({ searchParams }: SearchParams) {
  try {
    const { page } = await searchParams;
    const pageNumber = Number.parseInt(page ?? '1');
    const skip = pageNumber > 1 ? limit * (pageNumber - 1) : 0;

    const [products, banners, total] = await Promise.all([
      sanityClient.fetch<Product[]>(`
        *[_type == "product"] | order(_createdAt desc) [$skip...$end] {
          _id, title, price, slug,
          productImages[0..0]{ _type, alt, asset->{ _ref, url } }
        }
      `, { skip, end: skip + limit }),

      sanityClient.fetch<Banner[]>(`
        *[_type == "banner"] | order(order asc) {
          _id, image{ asset, alt }, link
        }
      `),

      sanityClient.fetch<number>(`count(*[_type == "product"])`),
    ]);

    const OPTIONS: EmblaOptionsType = { direction: 'rtl', loop: true };

    return (
      <>
        <Slider slides={banners} options={OPTIONS} />
        <div className="products" id="products">
          {products.map((product: Product) => (
            <ProductItem
              key={product._id}
              id={product._id}
              title={product.title}
              slug={product.slug.current}
              url={product.productImages?.[0]?.asset?.url
                ? product.productImages[0].asset.url
                : urlFor(product.productImages?.[0]?.asset).width(500).url() ?? ''}
              alt={product.productImages?.[0]?.alt ?? ''}
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