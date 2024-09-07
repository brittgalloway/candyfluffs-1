import { performRequest } from '@/app/lib/datocms';
import Image from 'next/image';
import { ProductItem } from '../components/productItem';
import styles from './page.module.scss'

export const metadata = {
  title: 'Candy Fluffs | Necahual',
  description: "Necahual is the mesoamerican magical girl series you've been waiting for. As seen on Webtoons, buy offical prints, charms, and stickers.",
  keywords: "necahual, magical girls, aztec, mayan, mahou shojo, mahou shoujo, mesoamerican, 2heroes, candy fluffs, candy joy, crystal galloway, serigo silva, manga, comics, webtoon, web comic, art, illustration",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    },
}
const PAGE_CONTENT_QUERY = `
  query NecahualQuery {
    necahual {
      pageTitle
      patreonDisclaimer
      summary {
        value
      }
      id
      necahualImage {
        url
        alt
      }
    }
    allProducts(filter: {fandoms: {eq: "Necahual"}}) {
      id
      title
      slug
      price
      image {
        alt
        url
      }
    }
  }
`;

export default async function TwoHeroes() {
  const { data: { necahual, allProducts} } = await performRequest({ query: PAGE_CONTENT_QUERY });

  return (
    <>
      <section className={`${styles.grid} ${styles.main}`}>
        <h1>{necahual?.pageTitle}</h1>
        <Image 
          alt={necahual?.necahualImage?.alt}
          src={necahual?.necahualImage?.url}
          width={500}
          height={500}
        />
        <p>{necahual?.summary?.value?.document?.children[0]?.children[0]?.value}</p>
        <h2>Read it on <a href="#">Webtoons</a>!</h2>
        <h2>Support us on:</h2>
        [socialMedia]
        <p><small>{necahual?.patreonDisclaimer}</small></p>
      </section>
      <section className={`${styles.grid} ${styles.products}`}>
        <h1>Merch</h1>
        {allProducts.map((product : 
        {id:string, title:string, price:number, slug:string, 
          image: [{url:string, alt:string}]}
        ) => (
          <ProductItem
            key={product?.id}
            id={product?.id}
            title={product?.title}
            slug={product?.slug}
            url={product?.image[0]?.url}
            alt={product?.image[0]?.alt}
            price={product?.price}
          />
        ))}
      </section>
    </>
  )
}


