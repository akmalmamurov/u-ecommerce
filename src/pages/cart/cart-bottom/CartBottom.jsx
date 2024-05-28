import { Box, Container } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useGetAllProductsQuery } from "../../../redux/services/productAllServices";
import Slider from "react-slick";
import { ProductCard } from "../../../components/card/product-card";
import "./CartBottom.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "../../../components/loading/Loading";
import { ProductLeftIcon, ProductRightIcon } from "../../../assets/icons";

const CartBottom = () => {
  const { data: products, isLoading } = useGetAllProductsQuery({
    limit: 20,
    page: 1,
  });

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <ProductRightIcon />,
    prevArrow: <ProductLeftIcon />,
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
          initial={{ y: 120, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          {isLoading ? (
            <Loading />
          ) : (
            <Slider {...settings}>
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </Slider>
          )}
        </motion.div>
      </Container>
    </Box>
  );
};

export default CartBottom;
