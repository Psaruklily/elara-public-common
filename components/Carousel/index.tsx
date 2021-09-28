import React, { useState } from 'react';
import KeenSlider, { useKeenSlider } from 'keen-slider/react';
import { CarouselArrow } from './partials';
import './styles.scss';

export default function Carousel(props: IProps) {
  const {
    images,
    slidesPerView,
    spacing,
    withArrows,
  } = props;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slidesPerView,
    spacing: spacing || 8,
    slideChanged: (instance: KeenSlider) => {
      setCurrentSlide(instance.details().relativeSlide);
    },
  });

  return (
    <div ref={sliderRef} className="Carousel">
      <div className="Carousel__slides keen-slider">
        {images.map((imageUrl, index) => (
          <img key={`carousel-image-${index}`} className="Carousel__image keen-slider__slide" src={imageUrl} alt="" />
        ))}
      </div>
      {withArrows && slider && (
        <>
          <CarouselArrow
            direction="left"
            onClick={() => slider.prev()}
            disabled={currentSlide === 0}
          />
          <CarouselArrow
            direction="right"
            onClick={() => slider.next()}
            disabled={currentSlide === slider.details().size - 1}
          />
        </>
      )}
    </div>
  );
};

interface IProps {
  images: Array<string>;
  slidesPerView?: number;
  spacing?: number;
  withArrows?: boolean;
}

Carousel.defaultProps = {
  slidesPerView: 2.5,
  spacing: 0,
  withArrows: false,
};
