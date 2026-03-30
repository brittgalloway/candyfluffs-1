import Image from 'next/image';
import { performRequest } from '@/app/lib/datocms';
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
  query BioQuery {
    aboutMe {
      bio {
        value
      }
      bioImage {
        alt
        url
      }
    }
  }
`;

export default async function About() {
  try {
  const { data: { aboutMe } } = await performRequest({ query: PAGE_CONTENT_QUERY });

  return (
  <section className={`${styles.main}`}>
    <h1>{aboutMe?.pageTitle}</h1>
    <Image 
      alt={aboutMe?.bioImage?.alt}
      src={aboutMe?.bioImage?.url}
      width={500}
      height={500}
    />
    <div className={`${styles.bio}`}>
      <h2>{aboutMe?.bio?.value?.document?.children[0]?.children[0]?.value}</h2>
      <p>{aboutMe?.bio?.value?.document?.children[1]?.children[0]?.value}</p>
      <p>{aboutMe?.bio?.value?.document?.children[2]?.children[0]?.value}</p>
      <p>{aboutMe?.bio?.value?.document?.children[3]?.children[0]?.value}</p>
      <p className={`${styles.rightAlign}`}>{aboutMe?.bio?.value?.document?.children[4]?.children[0]?.value}</p>
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


