import Image from 'next/image';
import { performRequest } from '@/lib/datocms';
import styles from './page.module.scss';

export const metadata = {
  title: 'Candy Fluffs | About me',
  description: "I'm just a girl who loves to draw manga! I am an illustrator who grew up on manga, and I'll forever be influenced by Sailor Moon.",
  keywords: "necahual, magical girls, aztec, mayan, mahou shojo, mahou shoujo, mesoamerican, 2heroes, candy fluffs, candy joy, crystal galloway, manga, comics, webtoon, web comic, art, illustration, mangaka",
  robots: { index: true, follow: true, nocache: true },
};

const PAGE_CONTENT_QUERY = `
  query BioQuery {
    aboutMe {
      bio { value }
      bioImage { alt url }
    }
  }
`;

type DastNode = {
  type: string;
  children?: Array<{ value?: string }>;
};

function renderBioNode(node: DastNode, idx: number) {
  const text = node.children?.map((c) => c.value ?? '').join('') ?? '';
  switch (node.type) {
    case 'heading':
      return <h2 key={idx}>{text}</h2>;
    case 'paragraph':
      return <p key={idx}>{text}</p>;
    default:
      return null;
  }
}

export default async function About() {
  try {
    const { data: { aboutMe } } = await performRequest({ query: PAGE_CONTENT_QUERY });
    const bioNodes: DastNode[] = aboutMe?.bio?.value?.document?.children ?? [];

    return (
      <section className={styles.main}>
        <h1>{aboutMe?.pageTitle}</h1>
        <Image
          alt={aboutMe?.bioImage?.alt ?? ''}
          src={aboutMe?.bioImage?.url}
          width={500}
          height={500}
        />
        <div className={styles.bio}>
          {bioNodes.map((node, idx) => renderBioNode(node, idx))}
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error fetching about page content:', error);
    return (
      <div>
        <h2 id="errorH2">Taking a Short break!</h2>
        <p id="errorMessage">Check back soon!</p>
      </div>
    );
  }
}