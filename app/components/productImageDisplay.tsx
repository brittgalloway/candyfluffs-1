'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import PhotoAlbum from 'react-photo-album';
import { ColumnsPhotoAlbum } from "react-photo-album";
import "react-photo-album/columns.css";

export function ProductImages({photos}: any ) {

  const [index, setIndex] = useState(0);
  const handleClick = ({ index: current }:any) => {
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
    <>
      <Image 
        className={`largeDisplay`}
        key= {photos[index]}
        src= {photos[index]?.url}
        width={500}
        height={500}
        alt= {photos[index]?.alt}
        />
      <ColumnsPhotoAlbum 
        photos={slides}
        columns={12}
        spacing={10}
        onClick={handleClick}
      />
    </>
  )
}