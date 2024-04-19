import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import "./ProductCard.scss";
import theme from "../../../theme";
import ShoppingIcon from "../../../assets/icons/ShoppingIcon";
import StarIcon from "../../../assets/icons/StarIcon";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/slices/productSlices";
import { FavouritesIcon } from "../../../assets/icons";
import { addToFavourit } from "../../../redux/slices/favouritSlices";
export const ProductCard = (props) => {
  const { id, main_image, name_ru, price, rating, description_ru } = props;
  const dispatch = useDispatch();

  return (
    <Card className="product-card" maxW="sm">
      <CardBody className="card-body">
        <Box className="card-top">
          <Image src={main_image} alt={name_ru} borderRadius="lg" />
        </Box>
        <Stack
          fontFamily={theme.fonts.fSF}
          className="card-bottom"
          mt="6"
          spacing="3"
        >
          <Heading size="md">{name_ru}</Heading>
          <Text>
            <StarIcon />
            {rating}
          </Text>
        </Stack>
      </CardBody>
      <CardFooter alignItems={"center"} justifyContent={"space-between"}>
        <Text fontFamily={theme.fonts.fInter}>{`${price} сум`}</Text>
        <button
          onClick={() =>
            dispatch(
              addToCart({
                id,
                main_image,
                price,
                description_ru,
                name_ru,
                quantity: 1,
              })
            )
          }
        >
          <ShoppingIcon />
        </button>
      </CardFooter>
      <button
        onClick={() =>
          dispatch(
            addToFavourit({
              id,
              main_image,
              price,
              description_ru,
              name_ru,
            })
          )
        }
        className="favourites-icon"
      >
        <FavouritesIcon style={{ color: "red" }} />
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
};
export default ProductCard;
