import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import theme from "../../../theme";
import { headingFormatter, kFormatter } from "../../../utils";
import {
  ShoppingIcon,
  StarIcon,
  ProductFavouritIcon,
} from "../../../assets/icons";
import { toggleFavourit } from "../../../redux/slices/favouritSlices";
import "./ProductCard.scss";
import { useEffect, useState } from "react";
import { addToCart } from "../../../redux/slices/productSlices";

export const ProductCard = (props) => {
  const { id, main_image, name_ru, price, rating, description_ru } = props;
  const favourites = useSelector((state) => state.favourit.favourites);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const isAddedToFavourites = favourites.some((item) => item.id === id);
  const toast = useToast();
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {}, [favourites]);
  useEffect(() => {}, [isAuth]);
  const goProductDetails = (id) => {
    navigate(`/products/${id}`);
  };

  const handleAddToCart = async () => {
    setIsAddedToCart(true);
    dispatch(
      addToCart(
        {
          id,
          main_image,
          price,
          name_ru,
          description_ru,
          rating,
          quantity: 1,
        },
        toast({
          title: "Добавлено в избранное",
          description: `${name_ru}`,
          status: "success",
          duration: 2000,
          isClosable: true,
        })
      )
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
    const isAdded = !isAddedToFavourites;
    toast({
      title: isAdded ? "Добавлено в избранное" : "Удалено из избранного",
      description: `${name_ru}`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };
  return (
    <Card className="product-card" maxW="sm" fontFamily={theme.fonts.fInter}>
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
           
        <CardBody className="card-body"  cursor={"pointer"} onClick={() => goProductDetails(id)}>
          <Box
            className="card-top"
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Image src={main_image} alt={name_ru} />
          </Box>

          <Stack
            cursor={"pointer"}
            className="card-bottom"
            mt="6"
            spacing="0.4rem"
          >
            <Text
              className="product-price"
              color={theme.colors.black}
            >{`${kFormatter(price)}`}</Text>

            <Heading size="md" className="product-name">
              {headingFormatter(name_ru)}
            </Heading>
            <Text display={"flex"} gap={"4px"} alignItems={"center"}>
              <StarIcon />
              <span className="product-rating">{rating}</span>
              <span className="product-rating">(0 заказов)</span>
            </Text>
          </Stack>
        </CardBody>
        <CardFooter
          alignItems={"center"}
          justifyContent={"space-between"}
          className="card-footer"
        >
          <button
            className="product-card_btn"
            onClick={handleAddToCart}
            disabled={isAddedToCart}
          >
            <ShoppingIcon />
            <span>В корзину</span>
          </button>
          <button onClick={handleToggleFavourit}>
            <ProductFavouritIcon
              className={`favourites-icon ${
                isAddedToFavourites ? "added" : ""
              }`}
            />
          </button>
        </CardFooter>
      </motion.div>
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
