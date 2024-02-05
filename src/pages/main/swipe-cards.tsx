import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css';

// Install Swiper modules

const VerticalCarousel = ({ children }) => {
  return (

    <Swiper
      direction={'vertical'}
      slidesPerView={1}
      className="mySwiper"
      threshold={25}
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
