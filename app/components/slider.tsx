import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const handleDragStart = (e:any) => e.preventDefault();


export const Gallery = ({banners} : any) => (
  // console.log(banners)
  <header>
    <AliceCarousel 
      mouseTracking
      items={banners.map((banner:any) => (
        <img src={banner.responsiveImage.src} alt={banner.alt} className='sliderimg' key={banner.alt}/>
      ))} />
  </header>
);
