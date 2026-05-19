import { type SanityDocument } from 'next-sanity'
import { client } from 'b/sanityLib/client';
import Image from 'next/image';
import styles from './page.module.scss';

export const metadata = {
  title: 'Candy Fluffs | About me',
  description: "I'm just a girl who loves to draw manga! I am an illustrator who grew up on manga, and I'll forever be influenced by Sailor Moon.",
  keywords: "necahual, magical girls, aztec, mayan, mahou shojo, mahou shoujo, mesoamerican, 2heroes, candy fluffs, candy joy, crystal galloway, manga, comics, webtoon, web comic, art, illustration, mangaka",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    },
}
const PAGE_CONTENT_QUERY = `
  *[
    _type == "about_me"
  ] {
    "id": _id,
    "header": greeting,
    "image": image{ alt_text, asset -> {url} },
    "bio": bio,
  }
`;

export default async function About() {
  try {
  const aboutMeData = await client.fetch<SanityDocument[]>(PAGE_CONTENT_QUERY, {});
  const aboutMe = aboutMeData[0];
  return (
  <section className={`${styles.main}`}>
    <Image 
      alt={aboutMe?.image?.alt_text}
      src={aboutMe?.image?.asset.url}
      width={500}
      height={500}
    />
    <h1>{aboutMe?.header}</h1>
    <div className={`${styles.bio}`}>
      <p>{aboutMe?.bio}</p>
      <p>(((o(*ﾟ▽ﾟ*)o)))♡</p>
      <p>-Candy Joy</p>
    </div>
  </section>
  )
} catch (error) {
  console.error('Error fetching about page content:', error);
 return (
    <div>
      <h2 id="errorH2">Taking a Short break!</h2>
      <span id="errorSpan">Will be back April 1st!</span>
    </div>
  )

}
}


