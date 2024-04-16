import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import "./ProductCard.scss";
import theme from "../../../theme";
import ShoppingIcon from "../../../assets/icons/ShoppingIcon";
export const ProductCard = (props) => {
  const { id, main_image, name_ru, price, rating, quantity } = props;
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
          <Text>{rating}</Text>
        </Stack>
      </CardBody>
      <CardFooter alignItems={"center"} justifyContent={"space-between"}>
        <Text fontFamily={theme.fonts.fInter}>{`${price} сум`}</Text>
        <button>
          <ShoppingIcon />
        </button>
      </CardFooter>
    </Card>
  );
};
ProductCard.propTypes = {
  id: PropTypes.string,
  main_image: PropTypes.string,
  name_ru: PropTypes.string,
  description_ru: PropTypes.string,
  rating: PropTypes.string,
  price: PropTypes.string,
};
export default ProductCard;
