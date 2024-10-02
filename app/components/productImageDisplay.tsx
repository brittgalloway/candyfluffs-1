'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import styles from '@/app/style/product-page.module.scss';

type Photo ={
  src:string,
  alt:string
}
export function ProductImages({photos}: any ) {

  const [index, setIndex] = useState(0);

  return (
    <div className={`${styles.imageWrapper}`}>
      <Image 
        className={`${styles.largeDisplay}`}
        key={photos[index]?.src}
        src={photos[index]?.src}
        width={500}
        height={500}
        alt={photos[index]?.alt}
        />
        <div className={`${styles.photoRow}`}>
          {photos.map((photo:Photo, idx:number) => {
            return(
              <span key={idx} onClick={() => setIndex(idx)}>
                <Image
                  src={photo?.src}
                  width={100}
                  height={100}
                  alt= {photo?.alt}
                  />
              </span>
            )
          })}
        </div>
    </div>
  )
}