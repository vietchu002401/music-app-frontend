import React from 'react';

import Slider from 'react-slick';
import "./slickSlider.scss"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

let SlickSlider = (props) => {

  let settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: props.slideToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    overflow: false,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  }

  return (
    <Slider {...settings}>
        {props.content}
    </Slider>
  );
};

export default SlickSlider;