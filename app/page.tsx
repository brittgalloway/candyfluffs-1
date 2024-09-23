import { performRequest } from '@/app/lib/datocms';
import { EmblaOptionsType } from 'embla-carousel'
import { ProductItem } from './components/productItem';
import Slider from './components/slider';



export default async function Home() {
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
      _allProductsMeta {
        count
      }
      allProducts {
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
  const OPTIONS: EmblaOptionsType = { direction: 'rtl', loop: true }
  const SLIDES = allBanners;
  return (
    <section>      
      <Slider 
        slides={SLIDES} 
        options={OPTIONS} 
      />
      <div className={`products`}>
        {allProducts.map((product : 
          {id:string, title:string, price:number, slug:string, 
            image: [{url:string, alt:string}]}
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
    </section>
  )
}
