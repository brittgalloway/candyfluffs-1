import { performRequest } from '@/app/lib/datocms';
import { ProductItem } from './components/productItem';
import { Gallery } from './components/slider';

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

  const { data: { allProducts, allBanners } } = await performRequest({ query: PAGE_CONTENT_QUERY });

  return (
    <section>      
      {/* {allBanners.map((banner: any) => (
        <Gallery
          key={banner.banner[0].id}
          banners={banner.banner[0]}
          />
      ))} */}
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
