import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css';


export interface VerticalCarouselProps {
  children: React.ReactNode;
}

const VerticalCarousel : React.FC <VerticalCarouselProps> = ({ children } ) => {
  return (

    <Swiper
      direction={'vertical'}
      slidesPerView={1}
      className="mySwiper"
      threshold={25}
      loop={true}
      style={{
        height: '100%',
      }}
    >
      {React.Children.map(children, (child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default VerticalCarousel;
