import { Container } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useGetAllProductsQuery } from "../../../../redux/services/productAllServices";
import GridProduct from "../../../../components/product-grid/GridProduct";
import { ProductCard } from "../../../../components/card/product-card";
import "./Product.scss";
const Product = () => {
  const { data: products, isLoading } = useGetAllProductsQuery();
  return (
    <section className="home-product">
      <Container maxW={"1200px"}>
        <motion.h1
          
        >
          Все продукты
        </motion.h1>
        <GridProduct>
          {isLoading ? (
            <div>...Loading</div>
          ) : (
            products?.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))
          )}
        </GridProduct>
      </Container>
    </section>
  );
};

export default Product;
