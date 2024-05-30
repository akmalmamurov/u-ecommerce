import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import "./BrandPage.scss";
import { Box, Container, Text, Spinner } from "@chakra-ui/react";
import { useGetBrandByIdQuery } from "../../redux/services/brandServices";
import { ProductCard } from "components/card/product-card";
import theme from "theme";
import { useGetProductsByBrandQuery } from "../../redux/services/productAllServices";
import GridBrand from "components/product-grid/GridBrand";
import { emptyCart } from "../../assets/images";

const BrandPage = () => {
  const { id } = useParams();
  const { data: brand, isLoading: isBrandLoading } = useGetBrandByIdQuery(id);
  const { data: products, isLoading: isProductsLoading } =
    useGetProductsByBrandQuery(id);

  return (
    <div className="brand-page">
      <Container maxW={"1200px"}>
        <Box className="brand-page_content" fontFamily={theme.fonts.fInter}>
          <h1 className="brand-page_title">Все товары {brand?.name}</h1>
          {isBrandLoading || isProductsLoading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="300px"
            >
              <Spinner size="xl" />
            </Box>
          ) : products.length > 0 ? (
            <GridBrand>
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </GridBrand>
          ) : (
            <motion.div
              className="cart-empty"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div>
                <img src={emptyCart} alt="emptyCart" />
              </div>
              <Text fontFamily={theme.fonts.fSf} className="empty-cart_text">
                В бренд ничего нет
              </Text>
              <Box fontFamily={theme.fonts.fInter} mt={"32px"}>
                <Link to="/" className="empty-cart_btn">
                  Вернуться на главную страницу
                </Link>
              </Box>
            </motion.div>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default BrandPage;
