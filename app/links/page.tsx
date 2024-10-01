import { performRequest } from '@/app/lib/datocms';
import '@/app/style/links.scss';

export const metadata = {
  title: 'Candy Fluffs | Links',
  description: "Find the links to my shop, social media, and comics.",
  keywords: "necahual, magical girls, aztec, mayan, mahou shojo, mahou shoujo, mesoamerican, 2heroes, candy fluffs, candy joy, crystal galloway, manga, comics, webtoon, web comic, art, illustration, mangaka",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    },
}
const PAGE_CONTENT_QUERY = `
  query MyLinks {
    allLinkPages {
      id
      label
      url
    }
  }
`;

export default async function Links() {
  const { data: { allLinkPages } } = await performRequest({ query: PAGE_CONTENT_QUERY });

  type Link = {
    id:string,
    url:string,
    label:string
  }
  return (
  <section className={``}>
    <h1>My Links!</h1>
    <nav aria-label='Links to CandyFluffs.com and various social media.'>
      <ul id="links">
        {allLinkPages.map((link:Link) => (
          <li key={link.id}>
            <a href={link.url}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  </section>
  )
}


