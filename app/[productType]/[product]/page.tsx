import { performRequest } from '@/app/lib/datocms';
import Image from 'next/image';
import styles from './page.module.scss'
import { ProductImages } from '@/app/components/productImageDisplay';

export default async function Product({ params }: any) {
  const PAGE_CONTENT_QUERY = `
    query productQuery {
      product(filter: {slug: {eq: "${params.product}"}}) {
        id
        fandoms
        description
        price
        size
        slug
        title
        weight
        image {
          alt
          url
        }
        variation {
          id
          price
          size
          title
          weight
          image {
            alt
            url
          }
        }
      }
    }
  `;
  const { data: { product } } = await performRequest({ query: PAGE_CONTENT_QUERY });
  const formatedPrice = product?.price.toLocaleString("en-US", { style: "currency", currency: "USD" });
  return (
    <section className={``}>
      <h1>{product?.title}</h1>
      <ProductImages
        photos={product?.image}
      />
      <p>{formatedPrice}</p>
      <p>{product?.description}</p>
      {product?.variation.length ? 
        <button className={`snipcart-add-item`}
          data-item-id={product?.id}
          data-item-price={product?.price}
          data-item-description={product?.description}
          data-item-name={product?.title}
          data-item-custom1-name="Frame color"
          data-item-custom1-options={product?.variation}
        >
          Add to cart - variation
        </button>
      : 
      <button className={`snipcart-add-item`}
        data-item-id={product?.id}
        data-item-price={product?.price}
        data-item-description={product?.description}
        data-item-name={product?.title}
      >
        Add to cart - no variation
      </button>
    }
      
    </section>
  );
}
