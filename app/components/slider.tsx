'use client';
import { FC } from 'react';
import Image from 'next/image';
import { EmblaOptionsType } from 'embla-carousel';
import { DotButton, useDotButton } from './sliderDots';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Banner } from '@/lib/types';
import '../style/slider.scss';

type PropType = {
  slides: Banner[]
  options?: EmblaOptionsType
}

const Slider: FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])
  

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
    return (
      <section className="embla" dir="rtl" aria-label="Banner carousel">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {slides.map((slide) => {
              const link = slide.link.value.document.children[0].children[0].url;
              return (
              <a href={link} className="embla__slide" key={slide.banner[0].id}>
                <Image
                  className="embla__slide__image"
                  src={slide.banner[0].responsiveImage.src}
                  width={slide.banner[0].responsiveImage.width}
                  height={slide.banner[0].responsiveImage.height}
                  alt={slide.banner[0].alt}
                />
              
              </a>
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
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === selectedIndex ? 'true' : undefined}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Slider