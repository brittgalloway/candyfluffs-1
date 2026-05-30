import { sanityClient } from '@/lib/sanity';
import { Link } from '@/lib/types';
import '@/style/links.scss';

export const metadata = {
  title: 'Candy Fluffs | Links',
  description: 'Find the links to my shop, social media, and comics.',
  robots: { index: true, follow: true, nocache: true },
};

export default async function Links() {
  try {
    const links = await sanityClient.fetch<Link[]>(`
      *[_type == "linkPage"] | order(order asc) {
        _id, label, url
      }
    `);

    return (
      <section>
        <h1>My Links!</h1>
        <nav aria-label='Links to CandyFluffs.com and various social media.'>
          <ul id="links">
            {links.map((link) => (
              <li key={link._id}>
                <a href={link.url}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    );
  } catch {
    return (
      <section>
        <h1>My Links!</h1>
        <nav aria-label='Links to CandyFluffs.com and various social media.'>
          <ul id="links">
            <li><a href="/">Candy Fluffs Shop</a></li>
            <li><a href="https://candy-fluffs.tumblr.com/">Tumblr</a></li>
            <li><a href="https://instagram.com/candy_fluffs">Instagram</a></li>
            <li><a href="https://bsky.app/profile/candyfluffs.bsky.social">Bluesky</a></li>
            <li><a href="https://www.webtoons.com/en/canvas/necahual/list?title_no=216820">Necahual</a></li>
            <li><a href="https://www.patreon.com/2heroes">Necahual Patreon</a></li>
          </ul>
        </nav>
      </section>
    );
  }
}