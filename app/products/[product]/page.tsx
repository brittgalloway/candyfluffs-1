import { performRequest } from '@/app/lib/datocms';
import { ProductImages } from '@/app/components/productImageDisplay';
import styles from '@/app/style/product-page.module.scss';

export default async function Product({ params }: any) {
  const { product } = await params;
  const PAGE_CONTENT_QUERY = `
    query productQuery {
      product(filter: {slug: {eq: "${product}"}}) {
        id
        fandoms
        description(markdown: true)
        price
        size
        weight
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
  const { data } = await performRequest({ query: PAGE_CONTENT_QUERY });
  const datoProduct = data.product;
  const domain = process.env.NODE_ENV == 'development' ? 'https://deploy-preview-22--candyfluffsdemo.netlify.app' 
    : '';
  const formatedPrice = datoProduct.price.toLocaleString("en-US", { style: "currency", currency: "USD" });
  function handleVariantion() {
    const options = datoProduct.variation.map((variant: {title: string, price:number}) => {
      if (variant.price != datoProduct.price) {
        if(datoProduct.price < variant.price) {
          const difference = variant.price - datoProduct.price;
          return `${variant.title}[+${difference}]`;
        } else {
          const difference = datoProduct.price - variant.price;
          return `${variant.title}[-${difference}]`;
        }
      } else {
        return variant.title;
      }
    }).join("|");
    return `${options}|${datoProduct.title}`;
  }

  const photos = datoProduct?.image.map((photo:any)=>(
    {
      src: photo?.url,
      width: 100,
      height: 100,
      alt: photo?.alt
    }
  ))
  return (
    <section className={`${styles.main}`}>
      <h1>{datoProduct.title}</h1>
      <ProductImages
        photos={photos}
      />
      <p className={`${styles.price}`}>{formatedPrice}</p>
      <div className={`${styles.description}`} dangerouslySetInnerHTML={{__html:datoProduct.description}}/>
      {datoProduct.variation.length ?
        <>
          <button className={`snipcart-add-item ${styles.add} ${styles.addChoices}`}
            data-item-id={datoProduct.id}
            data-item-price={datoProduct.price}
            data-item-description={datoProduct.description}
            data-item-name={datoProduct.title}
            data-item-url={`${domain}/products/${product}`}
            data-item-weight={datoProduct.weight}
            data-item-custom1-name="Select one"
            data-item-custom1-options={handleVariantion()}
            >
            Add to cart
          </button >
          <p className={`${styles.cartInstruction}`}>*You can select which one you want in the cart.</p>
        </>
      : 
      <button className={`snipcart-add-item ${styles.add}`}
        data-item-id={datoProduct.id}
        data-item-price={datoProduct.price}
        data-item-description={datoProduct.description}
        data-item-name={datoProduct.title}
        data-item-weight={datoProduct.weight}
        data-item-url={`${domain}/products/${product}`}
        >
        Add to cart
      </button>
    }
      
    </section>
  );
}
