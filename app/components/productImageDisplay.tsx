'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import styles from '@/style/product-page.module.scss';

type Photo = {
  src: string;
  alt: string;
  isVideo?: boolean;
}

function MainMedia({ photo }: { photo: Photo }) {
  if (photo.isVideo) {
    return (
      <video
        className={styles.largeDisplay}
        key={photo.src}
        src={photo.src}
        autoPlay
        loop
        muted
        playsInline
        aria-label={photo.alt}
      />
    );
  }
  return (
    <Image
      className={styles.largeDisplay}
      key={photo.src}
      src={photo.src}
      width={500}
      height={500}
      alt={photo.alt}
    />
  );
}

function ThumbnailMedia({ photo }: { photo: Photo }) {
  if (photo.isVideo) {
    return (
      <video
        src={photo.src}
        muted
        playsInline
        width={100}
        height={100}
        aria-hidden="true"
      />
    );
  }
  return (
    <Image
      src={photo.src}
      width={100}
      height={100}
      alt=""
    />
  );
}

export function ProductImages({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState(0);

  return (
    <div className={styles.imageWrapper}>
      <MainMedia photo={photos[index]} />
      <div className={styles.photoRow} role="group" aria-label="Product image thumbnails">
        {photos.map((photo: Photo, idx: number) => (
          <button
            key={idx}
            onClick={() => setIndex(idx)}
            aria-label={`View ${photo.isVideo ? 'video' : 'image'} ${idx + 1}${photo.alt ? `: ${photo.alt}` : ''}`}
            aria-pressed={idx === index}
            className={styles.thumbnailButton}
          >
            <ThumbnailMedia photo={photo} />
          </button>
        ))}
      </div>
    </div>
  );
}