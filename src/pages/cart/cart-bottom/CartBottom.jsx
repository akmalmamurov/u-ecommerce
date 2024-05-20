import { Box, Container } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useGetAllProductsQuery } from "../../../redux/services/productAllServices";
import GridProduct from "../../../components/product-grid/GridProduct";
import { ProductCard } from "../../../components/card/product-card";
import "./CartBottom.scss";
import Loading from "../../../components/loading/Loading";
const CartBottom = () => {
  const { data: products, isLoading } = useGetAllProductsQuery({
    limit: 20,
    page: 1,
  });
  return (
    <Box className="cart-bottom">
      <Container maxW={"1200px"}>
        <h1 className="cart-bottom_title">С этим товарам покупают еще</h1>
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <GridProduct>
            {isLoading ? (
             <Loading/>
            ) : (
              products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))
            )}
          </GridProduct>
        </motion.div>
      </Container>
    </Box>
  );
};

export default CartBottom;
