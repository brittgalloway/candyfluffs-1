import { performRequest } from '@/app/lib/datocms';
import { ProductItem } from './components/productItem';
import styles from "./page.module.scss";

export default async function Home() {
  const PAGE_CONTENT_QUERY = `
    query ProductsQuery {
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
  const { data: { allProducts } } = await performRequest({ query: PAGE_CONTENT_QUERY });

  return (
    <section className={`${styles.main}`}>
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
    </section>
  )
}
