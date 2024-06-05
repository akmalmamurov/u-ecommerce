/* eslint-disable react/prop-types */
import { Container } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetBrandQuery } from "../../../../redux/services/brandServices";
import Loading from "../../../../components/loading/Loading";
import {
  CartArrowRightIcon,
  CartLeftArrowIcon,
} from "../../../../assets/icons";
import "./Brands.scss";
import { BrandCard } from "components/card/brand-card";

const ArrowStyles = {
  zIndex: 1,
};

const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, ...ArrowStyles }}
      onClick={onClick}
    >
      <CartArrowRightIcon width={40} height={40} />
    </div>
  );
};

const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, ...ArrowStyles }}
      onClick={onClick}
    >
      <CartLeftArrowIcon width={40} height={40} />
    </div>
  );
};

const Brands = () => {
  const { data, isLoading } = useGetBrandQuery();
  const { data: brands } = data || {};

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="brands">
      <Container maxW={"1200px"}>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="brand-slider_container">
            <Slider {...settings} className="brand-slider">
              {brands.map((brand) => (
                <BrandCard key={brand.id} {...brand} />
              ))}
            </Slider>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Brands;
