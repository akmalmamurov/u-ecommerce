import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Box, Container, Text } from "@chakra-ui/react";

import GridProduct from "components/product-grid/GridProduct";
import { ProductCard } from "components/card/product-card";
import { emptyLike } from "assets/images";
import theme from "theme";
import "./Favourties.scss";

const FavouritesPage = () => {
  const favourites = useSelector((state) => state.favourit.favourites);
  return (
    <Box py={"32px"}>
      <Container maxW={"1200px"}>
        {favourites.length > 0 ? (
          <GridProduct>
            {favourites.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </GridProduct>
        ) : (
          <motion.div
            className="cart-empty"
            initial={{ y: 70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div>
              <img src={emptyLike} alt="emptyCart" />
            </div>
            <Text fontFamily={theme.fonts.fSf} className="empty-cart_text">
              Добавьте то, что понравилось <br />
              Нажмите на ♡ в товаре.
            </Text>
            <Box fontFamily={theme.fonts.fInter} mt={"32px"}>
              <Link to="/" className="empty-cart_btn">
                Вернуться на главную страницу
              </Link>
            </Box>
          </motion.div>
        )}
      </Container>
    </Box>
  );
};

export default FavouritesPage;
