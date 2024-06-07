import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Box, Card, CardBody, CardFooter, Stack, Text, } from "@chakra-ui/react";

import { toggleFavourit } from "../../../redux/slices/favouritSlices";
import { addToCart } from "../../../redux/slices/productSlices";
import { ShoppingIcon, StarIcon, ProductFavouritIcon, ProductCartSucessIcon, ProductFavouritActiveIcon, } from "assets/icons";
import theme from "theme";
import { headingFormatter, kFormatter } from "utils";
import "./ProductCard.scss";

export const ProductCard = (props) => {
  const { id, main_image, name_ru, price, rating, description_ru, quantity: zakaz, } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const favourites = useSelector((state) => state.favourit.favourites);
  const cart = useSelector((state) => state.product.products);

  const isAddedToFavourites = favourites.some((item) => item.id === id);
  const isAddedToCart = cart.some((item) => item.id === id);
  const imgWrapperRef = useRef(null);

  const goProductDetails = (id) => {
    navigate(`/products/${id}`);
  };

  const handleAddToCart = () => {
    const imgWrapperElement = imgWrapperRef.current;
    if (imgWrapperElement) {
      const imgElement = imgWrapperElement.querySelector("img");
      const imgClone = imgElement.cloneNode(true);
      imgClone.classList.add("fly-to-cart");

      const { top, left, width, height } = imgElement.getBoundingClientRect();
      imgClone.style.position = "fixed";
      imgClone.style.top = `${top}px`;
      imgClone.style.left = `${left}px`;
      imgClone.style.width = `${width}px`;
      imgClone.style.height = `${height}px`;

      document.body.appendChild(imgClone);

      const cartIcon = document.querySelector(".cart-icon");
      const cartRect = cartIcon.getBoundingClientRect();
      const xOffset = cartRect.left - left;
      const yOffset = cartRect.top - top;

      imgClone.style.transition = "transform 1s";
      imgClone.style.transform = `translate(${xOffset}px, ${yOffset} px) scale(0.2)`;

      setTimeout(() => {
        document.body.removeChild(imgClone);
      }, 1000);
    }

    dispatch(
      addToCart({
        id,
        main_image,
        price,
        name_ru,
        description_ru,
        rating,
        quantity: 1,
        stock: zakaz,
      })
    );
  };

  const handleToggleFavourit = () => {
    dispatch(
      toggleFavourit({
        id,
        main_image,
        price,
        description_ru,
        name_ru,
        rating,
      })
    );
  };

  return (
    <Card className="product-card" maxW="sm" fontFamily={theme.fonts.fInter}>
      <div>
        <CardBody
          className="card-body"
          cursor={"pointer"}
          onClick={() => goProductDetails(id)}
        >
          <Box
            className="card-top"
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <div ref={imgWrapperRef}>
              <LazyLoadImage src={main_image} alt={name_ru} />
            </div>
          </Box>

          <Stack
            cursor={"pointer"}
            className="card-bottom"
            mt="6"
            spacing="0.4rem"
          >
            <Text display={"flex"} gap={"4px"} alignItems={"center"}>
              <StarIcon />
              <span className="product-rating">{rating}</span>
              <span className="product-rating">({zakaz} В наличии )</span>
            </Text>
            <p className="product-name">{headingFormatter(name_ru)}</p>
          </Stack>
        </CardBody>
        <CardFooter
          alignItems={"center"}
          justifyContent={"space-between"}
          className="card-footer"
        >
          <div className="">
            <Text
              className="product-price"
              color={theme.colors.black}
            >{`${kFormatter(price)}`}</Text>
          </div>

          {isAddedToCart ? (
            <Link to="/cart" className="product-card_btn">
              <ProductCartSucessIcon />
            </Link>
          ) : (
            <button className="product-card_btn" onClick={handleAddToCart}>
              <ShoppingIcon />
            </button>
          )}
        </CardFooter>
        <button onClick={handleToggleFavourit} className="favourites-icon">
          {isAddedToFavourites ? (
            <ProductFavouritActiveIcon />
          ) : (
            <ProductFavouritIcon />
          )}
        </button>
      </div>
    </Card>
  );
};

ProductCard.propTypes = {
  id: PropTypes.string,
  main_image: PropTypes.string,
  name_ru: PropTypes.string,
  description_ru: PropTypes.string,
  rating: PropTypes.number,
  price: PropTypes.number,
  quantity: PropTypes.number,
};

export default ProductCard;
