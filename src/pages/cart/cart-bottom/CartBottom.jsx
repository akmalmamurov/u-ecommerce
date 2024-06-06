/* eslint-disable react/prop-types */
import { Box, Container } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useGetAllProductsQuery } from "../../../redux/services/productAllServices";
import Slider from "react-slick";
import { ProductCard } from "../../../components/card/product-card";
import "./CartBottom.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "../../../components/loading/Loading";
import { CartArrowRightIcon, CartLeftArrowIcon } from "../../../assets/icons";

const ArrowStyles = {
  width: 52,
  height: 52,
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
      <CartArrowRightIcon width={52} height={52} />
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
      <CartLeftArrowIcon width={52} height={52} />
    </div>
  );
};

const CartBottom = () => {
  const { data: products, isLoading } = useGetAllProductsQuery({
    limit: 40,
    page: 1,
  });

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
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
    <Box className="cart-bottom">
      <Container maxW={"1200px"}>
        <h1 className="cart-bottom_title">С этим товарам покупают еще</h1>
        <motion.div
          className="cart-bottom_motion"
          initial={{ y: 120, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          {isLoading ? (
            <Loading />
          ) : (
            <div className="cart-slider_container">
              <Slider {...settings} className="cart-slider">
                {products.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </Slider>
            </div>
          )}
        </motion.div>
      </Container>
    </Box>
  );
};
CartBottom.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  allProductDelete: PropTypes.func,
};
export default CartBottom;
