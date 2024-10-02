'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { ColumnsPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/columns.css';
import styles from '@/app/style/product-page.module.scss';

export function ProductImages({photos}: any ) {

  const [index, setIndex] = useState(0);
  const handleClick = ({ index: current }: {index:number}) => {
    setIndex(current);
  }

  return (
    <div className={`${styles.imageWrapper}`}>
      <Image 
        className={`${styles.largeDisplay}`}
        key= {photos[index]?.src}
        src= {photos[index]?.src}
        width={500}
        height={500}
        alt= {photos[index]?.alt}
        />
      <ColumnsPhotoAlbum  
        photos={photos}
        columns={photos?.length || 2}
        spacing={10}
        onClick={handleClick}
        />
    </div>
  )
}