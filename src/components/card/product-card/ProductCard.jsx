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
import { kFormatter } from "../../../utils";
import {
  ShoppingIcon,
  StarIcon,
  CartFavouritIcon,
} from "../../../assets/icons";
import { toggleFavourit } from "../../../redux/slices/favouritSlices";
import "./ProductCard.scss";
import { useAddBasketMutation } from "../../../redux/services/basketServices";
import { useEffect } from "react";

export const ProductCard = (props) => {
  const { id, main_image, name_ru, price, rating, description_ru, quantity } =
    props;
  const favourites = useSelector((state) => state.favourit.favourites);
  const isAddedToFavourites = favourites.some((item) => item.id === id);
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mutateAddBasket, { isSuccess, isError }] = useAddBasketMutation();
  const goProductDetails = (id) => {
    navigate(`/products/${id}`);
  };

  const handleAddToCart = () => {
    const productData = {
      product_id: id,
      quantity: 1,
    };
    mutateAddBasket(productData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Добавлено в корзину",
        description: `${name_ru}`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast({
        title: "Авторизуйтесь, чтобы добавить товар в корзину",
        description: "Что-то пошло не так",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }, [isError]);
  const handleToggleFavourit = () => {
    toast({
      title: "Авторизуйтесь, чтобы добавить товар в избранное",
      status: "error",
      duration: 2000,
      isClosable: true,
    });

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
      title: isAdded ? "Добавлено в Избранное" : "Удалено из Избранного",
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
        <CardBody className="card-body">
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
            onClick={() => goProductDetails(id)}
            className="card-bottom"
            mt="6"
            spacing="3"
          >
            <Heading size="md" className="product-name">
              {name_ru.length > 38 ? name_ru.slice(0, 34) + "..." : name_ru}
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
          <Text className="product-price">{`${kFormatter(price)}`}</Text>
          <button onClick={handleAddToCart}>
            <ShoppingIcon />
          </button>
        </CardFooter>
      </motion.div>
      <button onClick={handleToggleFavourit}>
        <CartFavouritIcon
          className={`favourites-icon ${isAddedToFavourites ? "added" : ""}`}
        />
      </button>
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
