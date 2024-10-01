import { performRequest } from '@/app/lib/datocms';
import { ProductImages } from '@/app/components/productImageDisplay';
import styles from '@/app/style/product-page.module.scss';

export default async function Product({ params }: any) {
  const PAGE_CONTENT_QUERY = `
    query productQuery {
      product(filter: {slug: {eq: "${params.product}"}}) {
        id
        fandoms
        description(markdown: true)
        price
        size
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
  const domain = process.env.NODE_ENV == 'development' ? 'https://deploy-preview-22--candyfluffsdemo.netlify.app' 
    : 'https://www.candyfluffs.com';
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
    return `${options}|${product.title}`;
  }

  return (
    <section className={`${styles.main}`}>
      <h1>{product?.title}</h1>
      <ProductImages
        photos={product?.image}
      />
      <p className={`${styles.price}`}>{formatedPrice}</p>
      <div className={`${styles.description}`} dangerouslySetInnerHTML={{__html:product?.description}}/>
      {product?.variation.length ?
        <>
          <button className={`snipcart-add-item ${styles.add} ${styles.addChoices}`}
            data-item-id={product?.id}
            data-item-price={product?.price}
            data-item-description={product?.description}
            data-item-name={product?.title}
            data-item-url={`/products/${params.product}`}
            data-item-custom1-name="Select one"
            data-item-custom1-options={handleVariantion()}
            >
            Add to cart
          </button >
          <p className={`${styles.cartInstruction}`}>*You can select which one you want in the cart.</p>
        </>
      : 
      <button className={`snipcart-add-item ${styles.add}`}
        data-item-id={product?.id}
        data-item-price={product?.price}
        data-item-description={product?.description}
        data-item-name={product?.title}
        data-item-url={`/products/${params.product}`}
        >
        Add to cart
      </button>
    }
      
    </section>
  );
}
