import { sanityClient } from '@/lib/sanity';
import { LiveEvent } from '@/lib/types';
import ErrorFallback from '@/components/errorFallback';
import styles from './page.module.scss';

export const metadata = {
  title: 'Candy Fluffs | Events',
  robots: { index: true, follow: true, nocache: true },
};

export default async function Events() {
  try {
    const events = await sanityClient.fetch<LiveEvent[]>(`
      *[_type == "liveEvent"] | order(startDate asc) {
        _id, eventName, startDate, endDate, website, address
      }
    `);

    const formatDateTime = (dateString: string) => {
      const date = new Date(dateString);
      return `${date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} at ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
    };

    return (
      <section className={styles.main}>
        <h1 className={styles.h1}>Planned Events</h1>
        {events.map((event) => (
          <div key={event._id} className={styles.events}>
            <h2>{event.eventName}</h2>
            <p>{formatDateTime(event.startDate)} - {formatDateTime(event.endDate)}</p>
            <p>{event.address}</p>
            <p>Get tickets here: <a href={event.website}>{event.website}</a></p>
          </div>
        ))}
      </section>
    );
  } catch (error) {
    console.error('Error fetching page:', error);
    return <ErrorFallback />;
  }
}