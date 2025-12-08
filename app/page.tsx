import { performRequest, limit } from '@/app/lib/datocms';
import { Product, SearchParams } from '@/app/lib/types';
import { EmblaOptionsType } from 'embla-carousel';
import { ProductItem } from './components/productItem';
import Slider from './components/slider';
import Pagination from './components/pagination';

export default async function Home({searchParams}: SearchParams) {
  const {page} = await searchParams;
  const pageNumber = Number.parseInt( page ?? '1');

  const skip = pageNumber > 1 ? limit * (pageNumber - 1) : 0;

  const PAGE_CONTENT_QUERY = `
    query ProductsQuery {
      allBanners {
        banner {
          id
          alt
          responsiveImage {
            src
            width
            height
          }
        }
        link {
          value
        }
      }
      _allProductsMeta(filter: {_status: {eq: published}}) {
        count
      }
      allProducts(first:${limit}, skip:${skip}) {
        id
        title
        price
        slug
        image {
          alt
          url
        }
      }
    }
  `;

  const { data: { allProducts, allBanners, _allProductsMeta } } = await performRequest({ query: PAGE_CONTENT_QUERY });
  const productCount = _allProductsMeta.count;
  const OPTIONS: EmblaOptionsType = { direction: 'rtl', loop: true }
  const SLIDES = allBanners;
  return (
    <>      
      <Slider 
        slides={SLIDES} 
        options={OPTIONS} 
      />
      <div className={`products`} id="products">
        {allProducts.map((product : Product
          ) => (
          <ProductItem
            key={product?.id}
            id={product?.id}
            title={product?.title}
            slug={product?.slug}
            url={product?.image[0].url}
            alt={product?.image[0].alt}
            price={product?.price}
          />
        )
        )}
      </div>
      <Pagination
        numberOfProducts={productCount}
        currentPage={pageNumber}
        maxItems={limit}
      />
    </>
  )
}
