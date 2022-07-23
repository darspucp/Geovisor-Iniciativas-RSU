import React from "react";
import Slider from "react-slick";

import IniciativaCarousel from "../Iniciativas/IniciativaCarousel";

import cn from "classnames";

import styles from "./CarouselIniciativas.module.scss";

class CarouselIniciativas extends React.Component {
  componentDidMount() {}

  carouselElements = () => {
    var iniciativas = [];

    if (this.props.listaIniciativas.length > 0) {
      iniciativas = this.props.listaIniciativas.map((iniciativa, index) => {
        return (
          <div
            key={index}
            className={cn(
              styles.contenedor_iniciativa_carousel,
              "flex-center-center"
            )}
          >
            <IniciativaCarousel
              postIniciativa={iniciativa}
            ></IniciativaCarousel>
          </div>
        );
      });
    }

    return iniciativas;
  };

  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      rows: 2,
      arrows: true,
      slidesPerRow: 1,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <div className={cn(styles.slick_slider)}>
        <Slider {...settings}>{this.carouselElements()}</Slider>
      </div>
    );
  }
}

export default CarouselIniciativas;
