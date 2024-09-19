'use client'
import React, { FC } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import { DotButton, useDotButton } from './sliderDots'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import '../style/slider.scss'
import Image from 'next/image'

type PropType = {
  slides: any[]
  options?: EmblaOptionsType
}

const Slider: FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])
  

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
    return (
      <header className="embla" dir="rtl">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide) => {
            return (
            <div className="embla__slide" key={slide.banner[0].id}>
              <Image
                className="embla__slide__image"
                src={slide.banner[0].responsiveImage.src}
                width={slide.banner[0].responsiveImage.width}
                height={slide.banner[0].responsiveImage.height}
                alt={slide.banner[0].alt}
              />
            </div>
          )}
          )}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </header>
  )
}

export default Slider
