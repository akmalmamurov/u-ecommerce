import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import theme from "../../../theme";
import { headingFormatter, kFormatter } from "../../../utils";
import {
  ShoppingIcon,
  StarIcon,
  ProductFavouritIcon,
  ProductCartSucessIcon,
  ProductFavouritActiveIcon,
} from "../../../assets/icons";
import { toggleFavourit } from "../../../redux/slices/favouritSlices";
import { addToCart } from "../../../redux/slices/productSlices";
import "./ProductCard.scss";

export const ProductCard = (props) => {
  const {
    id,
    main_image,
    name_ru,
    price,
    rating,
    description_ru,
    quantity: zakaz,
  } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const favourites = useSelector((state) => state.favourit.favourites);
  const cart = useSelector((state) => state.product.products);

  const isAddedToFavourites = favourites.some((item) => item.id === id);
  const isAddedToCart = cart.some((item) => item.id === id);

  const goProductDetails = (id) => {
    navigate(`/products/${id}`);
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id,
        main_image,
        price,
        name_ru,
        description_ru,
        rating,
        quantity: 1,
      })
    );
    toast({
      title: "Добавлено в корзину",
      description: `${name_ru}`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
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
            <Image src={main_image} alt={name_ru} />
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
          <button className="product-card_btn">
            {isAddedToCart ? (
              <Link to="/cart">
                <ProductCartSucessIcon />
              </Link>
            ) : (
              <ShoppingIcon onClick={handleAddToCart} />
            )}
          </button>
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
