import { performRequest } from '@/app/lib/datocms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faXTwitter, faPatreon } from '@fortawesome/free-brands-svg-icons';
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

export const tagline = "Necahual";

export default async function TwoHeroes() {
  const { data: { necahual, allProducts} } = await performRequest({ query: PAGE_CONTENT_QUERY });
  const socialMedia = [
    {href: 'https://www.patreon.com/2heroes', label: 'Link to 2Heroes\' Patreon', icon: faPatreon},
    {href: 'https://www.instagram.com/2.heroes/', label: 'Link to 2Heroes\' Instagram', icon: faInstagram},
    {href: 'https://twitter.com/2Heroes1/', label: 'Link to 2Heroes\' X', icon: faXTwitter},
  ]
  return (
    <>
      <section className={`${styles.grid}`}>
        <h1 className={`${styles.span3mobile} ${styles.title}`}>{necahual?.pageTitle}</h1>
        <Image 
          className={`${styles.span3mobile}`}
          alt={necahual?.necahualImage?.alt}
          src={necahual?.necahualImage?.url}
          width={500}
          height={500}
        />
        <h2 className={`${styles.span3mobile} ${styles.necahual} ${styles.alignCenter}`}>Read it on <a className={`${styles.webtoons}`} href="https://www.webtoons.com/en/canvas/necahual/list?title_no=216820">Webtoons</a>!</h2>
        <p className={`${styles.span3mobile} ${styles.necahual}`}>{necahual?.summary?.value?.document?.children[0]?.children[0]?.value}</p>
        <h2 className={`${styles.span3mobile} ${styles.necahual} ${styles.alignCenter}`}>Support us on:</h2>
        {socialMedia.map((link) => (
          <a key={link.href} href={link.href} aria-label={link.label}><FontAwesomeIcon icon={link.icon} size="lg"/></a>
        ))}
        <p className={`${styles.span3mobile} ${styles.necahual}`}><small>{necahual?.patreonDisclaimer}</small></p>
      </section>
      <section className={``}>
        <h1 className={`${styles.title}`} >Merch</h1>
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
            url={product?.image[0]?.url}
            alt={product?.image[0]?.alt}
            price={product?.price}
          />
        ))}
        </div>
      </section>
    </>
  )
}


