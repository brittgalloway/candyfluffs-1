'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import styles from '@/app/style/product-page.module.scss';

type Photo = {
  src: string;
  alt: string;
}

export function ProductImages({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState(0);

  return (
    <div className={styles.imageWrapper}>
      <Image
        className={styles.largeDisplay}
        key={photos[index]?.src}
        src={photos[index]?.src}
        width={500}
        height={500}
        alt={photos[index]?.alt}
      />
      <div className={styles.photoRow} role="group" aria-label="Product image thumbnails">
        {photos.map((photo: Photo, idx: number) => (
          <button //need to fix stlyes
            key={idx}
            onClick={() => setIndex(idx)}
            aria-label={`View image ${idx + 1}${photo.alt ? `: ${photo.alt}` : ''}`}
            aria-pressed={idx === index}
            className={styles.thumbnailButton}
          >
            <Image
              src={photo?.src}
              width={100}
              height={100}
              alt=""
            />
          </button>
        ))}
      </div>
    </div>
  );
}