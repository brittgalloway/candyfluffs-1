import { performRequest } from '@/app/lib/datocms';
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
  function handleVariantion() {
    const options = product.variation.map((variant: {title: string, price:number}) => {
      if (variant.price != product.price) {
        if(product.price < variant.price) {
          const difference = variant.price - product.price;
          return `${variant.title}[+${difference}]`;
        } else {
          const difference = product.price - variant.price;
          return `${variant.title}[-${difference}]`;
        }
      } else {
        return variant.title;
      }
    }).join("|");
    return options;
  }
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
          data-item-custom1-name="Select one"
          data-item-custom1-options={handleVariantion()}
        >
          Add to cart
        </button>
      : 
      <button className={`snipcart-add-item`}
        data-item-id={product?.id}
        data-item-price={product?.price}
        data-item-description={product?.description}
        data-item-name={product?.title}
      >
        Add to cart
      </button>
    }
      
    </section>
  );
}
