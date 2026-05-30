import { sanityClient, urlFor } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import { ProductImages } from '@/components/productImageDisplay';
import ErrorFallback from '@/components/errorFallback';
import styles from '@/style/product-page.module.scss';

export default async function Product({ params }: { params: Promise<{ product: string }> }) {
  try {
    const { product: slug } = await params;

    const sanityProduct = await sanityClient.fetch(`
      *[_type == "product" && slug.current == $slug][0] {
        _id, title, price, weight, size, fandoms, productType,
        description,
        slug,
        image[]{ asset, alt },
        variation[]{ title, price, size, weight, image{ asset } }
      }
    `, { slug });

    const domain = process.env.NODE_ENV === 'production'
      ? (process.env.NEXT_PUBLIC_SITE_URL ?? '')
      : 'http://localhost:3000';

    const formattedPrice = sanityProduct.price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    function handleVariation() {
      const options = sanityProduct.variation.map((variant: { title: string; price: number }) => {
        if (variant.price !== sanityProduct.price) {
          if (sanityProduct.price < variant.price) {
            return `${variant.title}[+${variant.price - sanityProduct.price}]`;
          } else {
            return `${variant.title}[-${sanityProduct.price - variant.price}]`;
          }
        }
        return variant.title;
      }).join('|');
      return `${options}|${sanityProduct.title}`;
    }

    const photos = sanityProduct.image.map((photo: { asset: { _ref: string }; alt: string }) => ({
      src: urlFor(photo.asset).width(500).url(),
      width: 500,
      height: 500,
      alt: photo.alt ?? '',
    }));

    return (
      <section className={styles.main}>
        <h1>{sanityProduct.title}</h1>
        <ProductImages photos={photos} />
        <p className={styles.price}>{formattedPrice}</p>
        <div className={styles.description}>
          <PortableText value={sanityProduct.description} />
        </div>
        {sanityProduct.variation?.length ? (
          <>
            <button
              className={`snipcart-add-item ${styles.add} ${styles.addChoices}`}
              data-item-id={sanityProduct._id}
              data-item-price={sanityProduct.price}
              data-item-name={sanityProduct.title}
              data-item-url={`${domain}/products/${slug}`}
              data-item-weight={sanityProduct.weight}
              data-item-custom1-name="Select one"
              data-item-custom1-options={handleVariation()}
            >
              Add to cart
            </button>
            <p className={styles.cartInstruction}>*You can select which one you want in the cart.</p>
          </>
        ) : (
          <button
            className={`snipcart-add-item ${styles.add}`}
            data-item-id={sanityProduct._id}
            data-item-price={sanityProduct.price}
            data-item-name={sanityProduct.title}
            data-item-url={`${domain}/products/${slug}`}
            data-item-weight={sanityProduct.weight}
          >
            Add to cart
          </button>
        )}
      </section>
    );
  } catch (error) {
    console.error('Error fetching page:', error);
    return <ErrorFallback />;
  }
}