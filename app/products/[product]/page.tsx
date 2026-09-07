import { cache } from 'react'
import { type Metadata } from 'next'
import { performRequest } from '@/lib/datocms';
import { ProductImages } from '@/components/productImageDisplay';
import styles from '@/style/product-page.module.scss';

 const PAGE_CONTENT_QUERY = `
    query productQuery($slug: String!) {
      product(filter: {slug: {eq: $slug}}) {
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
const getProduct = cache(async (product: string) => {
  const _product = await performRequest({ query: PAGE_CONTENT_QUERY, variables: { slug: product } });
  return _product.data.product;
});

export async function generateMetadata(
  { params }: { params: Promise<{ product: string }> }
) : Promise<Metadata> {
  const { product } = await params;
  const thisProduct = await getProduct(product);
  const indexFandoms = ['LADS', 'Danmei', 'Necahual'];
  const title = thisProduct.title;
  const fandom = thisProduct.fandoms;
  if (!indexFandoms.includes(fandom)) {
    return{};
  } else {
    return {
      title: `Candy Fluffs | ${title} | ${fandom}`,
      description: `${title} from ${fandom} by Candyfluffs.`,
      robots: { index: true, follow: true, nocache: true },
    }
  };
}

export default async function Product({ params }: { params: Promise<{ product: string }> }) {
  try {
  const { product } = await params;

  const datoProduct = await getProduct(product);
  // const datoProduct = data.product;
  const domain = process.env.NODE_ENV === 'production'
    ? (process.env.NEXT_PUBLIC_SITE_URL ?? '')
    : 'http://localhost:3000';
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
} catch  {
 return (
    <div>
      <h2 id="errorH2">Oops!</h2>
      <span id="errorSpan">There'es a problem behind the scenes. If refreshing doesn't work, please use the contact form or find me on Instagram.</span>
    </div>
  )
}
}