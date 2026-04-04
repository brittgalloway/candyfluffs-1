import '@/style/links.scss';

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
  try {
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
        <li>
          Ichigo Tarot (coming soon)
        </li>
        {allLinkPages.map((link:Link) => (
          <li key={link.id}>
            <a href={link.url}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  </section>
  )
} catch (error) {
 return (
     <section >
    <h1>My Links!</h1>
    <nav aria-label='Links to CandyFluffs.com and various social media.'>
      <ul id="links">
        <li>
          Ichigo Tarot (coming soon)
        </li>
        <li>
          <a href="/">Candy Fluffs Shop</a>
        </li>
        <li>
          <a href="https://candy-fluffs.tumblr.com/">Tumblr</a>
        </li>
        <li>
          <a href="https://instagram.com/candyfluffs">Instagram</a>
        </li>
        <li>
          <a href="https://twitter.com/candyfluffs">X (formally Twitter)</a>
        </li>
        <li>
          <a href="https://www.webtoons.com/en/canvas/necahual/list?title_no=216820">Necahual</a>
        </li>
        <li>
          <a href="https://www.patreon.com/2heroes">Necahual Patreon</a>
        </li>
        <li>
          <a href="https://www.instagram.com/2.heroes/">2Heroes Instagram</a>
        </li>
        <li>
          <a href="https://x.com/2Heroes1/">2Heroes X (formally Twitter)</a>
        </li>
      </ul>
    </nav>
  </section>
  )
}
}

