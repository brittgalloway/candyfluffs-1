import { performRequest } from '@/app/lib/datocms';
import Image from 'next/image';

export const metadata = {
  title: 'Candy Fluffs ',
}

export default async function ProductsByType( {params} : any ) {
  const PAGE_CONTENT_QUERY = `
    query ProductsQuery {
      allProducts(filter: {productType: {eq: "${params.productType}"}}) {
        id
        title
        fandoms
        productType
        price
        image {
          alt
          url
        }
      }
    }
  `;
  const { data: { allProducts } } = await performRequest({ query: PAGE_CONTENT_QUERY });

  return (
    <section >
      <h1>{params.productType}</h1>
      {allProducts.map((product: any) => (
        <div key={product?.id}>
          {product?.title}
          {product?.fandoms}
          {product?.productType}
          {product?.price}
        </div>
      )
      )}
    </section>
  )
}


