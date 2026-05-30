import Image from 'next/image';
import { sanityClient, urlFor } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import ErrorFallback from '@/components/errorFallback';
import styles from './page.module.scss';

export const metadata = {
  title: 'Candy Fluffs | About me',
  description: "I'm just a girl who loves to draw manga! I am an illustrator who grew up on manga, and I'll forever be influenced by Sailor Moon.",
  keywords: "necahual, magical girls, aztec, mayan, mahou shojo, mahou shoujo, mesoamerican, 2heroes, candy fluffs, candy joy, crystal galloway, manga, comics, webtoon, web comic, art, illustration, mangaka",
  robots: { index: true, follow: true, nocache: true },
};

export default async function About() {
  try {
    const aboutMe = await sanityClient.fetch(`
      *[_type == "aboutMe"][0] {
        bio, bioImage{ asset, alt }
      }
    `);

    return (
      <section className={styles.main}>
        <Image
          alt={aboutMe?.bioImage?.alt ?? ''}
          src={urlFor(aboutMe?.bioImage?.asset)?.width(500)?.url()}
          width={500}
          height={500}
        />
        <div className={styles.bio}>
          <PortableText value={aboutMe?.bio} />
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error fetching page:', error);
    return <ErrorFallback />;
  }
}