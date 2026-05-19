import Image from 'next/image';
import { performRequest, limit } from '@/app/lib/datocms';
import { Product, SearchParams } from '@/app/lib/types';
import { FaInstagram, FaXTwitter, FaPatreon } from '@/app/components/icons';
import { ProductItem } from '@/app/components/productItem';
import Pagination from '@/app/components/pagination';
import styles from './page.module.scss';

export const metadata = {
  title: 'Candy Fluffs | Necahual',
  description: "Necahual is the mesoamerican magical girl series you've been waiting for. As seen on Webtoons, buy official prints, charms, and stickers.",
  keywords: "necahual, magical girls, aztec, mayan, mahou shojo, mahou shoujo, mesoamerican, 2heroes, candy fluffs, candy joy, crystal galloway, sergio silva, manga, comics, webtoon, web comic, art, illustration",
  robots: { index: true, follow: true, nocache: true },
};

export default async function TwoHeroes({ searchParams }: SearchParams) {
  try {
    const { page } = await searchParams;
    const pageNumber = Number.parseInt(page ?? '1');
    const skip = pageNumber > 1 ? limit * (pageNumber - 1) : 0;

    const PAGE_CONTENT_QUERY = `
      query NecahualQuery($limit: IntType!, $skip: IntType!) {
        necahual {
          pageTitle
          patreonDisclaimer
          summary { value }
          id
          necahualImage { url alt }
        }
        allProducts(filter: {fandoms: {eq: "Necahual"}}, first: $limit, skip: $skip) {
          id title slug price
          image { alt url }
        }
        _allProductsMeta(filter: {fandoms: {eq: "Necahual"}, _status: {eq: published}}) {
          count
        }
      }
    `;

    const { data: { necahual, allProducts, _allProductsMeta } } = await performRequest({
      query: PAGE_CONTENT_QUERY,
      variables: { limit, skip },
    });

    const productCount = _allProductsMeta.count;

    const socialMedia = [
      { href: 'https://www.patreon.com/2heroes', label: "Link to 2Heroes' Patreon", Icon: FaPatreon },
      { href: 'https://www.instagram.com/2.heroes/', label: "Link to 2Heroes' Instagram", Icon: FaInstagram },
      { href: 'https://twitter.com/2Heroes1/', label: "Link to 2Heroes' X", Icon: FaXTwitter },
    ];

    return (
      <>
        <section className={styles.grid}>
          <h1 className={`${styles.span3mobile} ${styles.title}`}>{necahual?.pageTitle}</h1>
          <Image
            className={styles.span3mobile}
            alt={necahual?.necahualImage?.alt}
            src={necahual?.necahualImage?.url}
            width={500}
            height={500}
          />
          <h2 className={`${styles.span3mobile} ${styles.necahual} ${styles.alignCenter}`}>
            Read it on <a className={styles.webtoons} href="https://www.webtoons.com/en/canvas/necahual/list?title_no=216820">Webtoons</a>!
          </h2>
          <p className={`${styles.span3mobile} ${styles.necahual}`}>{necahual?.summary?.value?.document?.children[0]?.children[0]?.value}</p>
          <h2 className={`${styles.span3mobile} ${styles.necahual} ${styles.alignCenter}`}>Support us on:</h2>
          {socialMedia.map((link) => (
            <a key={link.href} href={link.href} aria-label={link.label}>
              <link.Icon size={30} />
            </a>
          ))}
          <p className={`${styles.span3mobile} ${styles.necahual}`}><small>{necahual?.patreonDisclaimer}</small></p>
        </section>
        <section className={styles.merchSection}>
          <h1 className={styles.title} id="products">Merch</h1>
          <div className='products'>
            {allProducts.map((product: Product) => (
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
          <Pagination
            numberOfProducts={productCount}
            currentPage={pageNumber}
            maxItems={limit}
          />
        </section>
      </>
    );
  } catch {
    return (
      <div>
        <h2 id="errorH2">Taking a Short break!</h2>
        <p id="errorMessage">Check back soon!</p>
      </div>
    );
  }
}