import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
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
import theme from "../../../theme";
import {
  ShoppingIcon,
  StarIcon,
  FavouritesIcon,
} from "../../../assets/icons";
import { addToCart } from "../../../redux/slices/productSlices";
import { toggleFavourit } from "../../../redux/slices/favouritSlices";
import "./ProductCard.scss";

export const ProductCard = (props) => {
  const { id, main_image, name_ru, price, rating, description_ru, quantity } =
    props;
  const favourites = useSelector((state) => state.favourit.favourites);
  const isAddedToFavourites = favourites.some((item) => item.id === id);
  const toast = useToast();
  const dispatch = useDispatch();
  return (
    <Card className="product-card" maxW="sm" fontFamily={theme.fonts.fInter}>
      <motion.div
        initial={{ y: 65, opacity: 0, scale: 1.3 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <CardBody className="card-body">
          <Box className="card-top">
            <Image src={main_image} alt={name_ru} />
          </Box>
          <Stack className="card-bottom" mt="6" spacing="3">
            <Heading size="md" className="product-name">
              {name_ru}
            </Heading>
            <Text display={"flex"} gap={"4px"} alignItems={"center"}>
              <StarIcon />
              <span className="product-rating">{rating}</span>
              <span className="product-rating">(0 заказов)</span>
            </Text>
          </Stack>
        </CardBody>
        <CardFooter alignItems={"center"} justifyContent={"space-between"}>
          <Text className="product-price">{`${price} сум`}</Text>
          <button
            onClick={() =>
              dispatch(
                addToCart(
                  {
                    id,
                    main_image,
                    price,
                    description_ru,
                    name_ru,
                    quantity: 1,
                  },
                  toast({
                    title: "Добавлено в корзину",
                    description: `${name_ru}`,
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                  })
                )
              )
            }
          >
            <ShoppingIcon />
          </button>
        </CardFooter>
        <button
          onClick={() => {
            dispatch(
              toggleFavourit({
                id,
                main_image,
                price,
                description_ru,
                name_ru,
                quantity,
                rating,
              })
            );
            const isAdded = !isAddedToFavourites;
            toast({
              title: isAdded
                ? "Добавлено в Избранное"
                : "Удалено из Избранного",
              description: `${name_ru}`,
              status: "success",
              duration: 2000,
              isClosable: true,
            });
          }}
        >
          <FavouritesIcon
            className={`favourites-icon ${isAddedToFavourites ? "added" : ""}`}
          />
        </button>
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
