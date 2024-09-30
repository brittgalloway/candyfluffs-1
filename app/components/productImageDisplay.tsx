'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { ColumnsPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/columns.css';
import styles from '@/app/style/product-page.module.scss';

export function ProductImages({photos}: any ) {

  const [index, setIndex] = useState(0);
  const handleClick = ({ index: current }:{index:number}) => {
    setIndex(current);
  }
  const slides = photos.map((photo:any) => (
    {
        src: photo?.url,
        width: 100,
        height: 100,
        alt: photo?.alt
    }))
  return (
    <div className={`${styles.imageWrapper}`}>
      <Image 
        className={`${styles.largeDisplay}`}
        key= {photos[index]}
        src= {photos[index]?.url}
        width={500}
        height={500}
        alt= {photos[index]?.alt}
        />
      <ColumnsPhotoAlbum  
        photos={slides}
        columns={photos?.length || 2}
        spacing={10}
        onClick={handleClick}
      />
    </div>
  )
}