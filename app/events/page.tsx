import { performRequest } from '@/app/lib/datocms';
import styles from "./page.module.scss";

const PAGE_CONTENT_QUERY = `
  query liveEvent {
    allLiveEvents {
      id
      eventName
      startDate
      endDate
      website
      address
    }
  }
`;

export default async function Events() {
  const { data: { allLiveEvents } } = await performRequest({ query: PAGE_CONTENT_QUERY });

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    return `${formattedDate} at ${formattedTime}`;
  };

  return (
    <section className={styles.main} >
      <h1 className={styles.h1}>Planned Events</h1>
      {allLiveEvents.map((liveEvent: {id: string, eventName: string, startDate: string, endDate: string, website: string, address: string}) => (
        <div key={liveEvent?.id} className={styles.events}>
          <h2>{liveEvent?.eventName}</h2>
          <p>{formatDateTime(liveEvent?.startDate)} - {formatDateTime(liveEvent?.endDate)}</p>
          <p>{liveEvent?.address}</p>
          <p>Get tickets Here: <a href={liveEvent?.website}>{liveEvent?.website}</a></p>
        </div>
      ))}
    </section>
  )
}
