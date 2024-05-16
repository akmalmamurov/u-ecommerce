import { Box, Container } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useGetAllProductsQuery } from "../../../../redux/services/productAllServices";
import GridProduct from "../../../../components/product-grid/GridProduct";
import { ProductCard } from "../../../../components/card/product-card";
import "./Product.scss";
import { memo, useState, useEffect } from "react";

const Product = memo(() => {
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState([]);
  const { data: products, isLoading, isFetching } = useGetAllProductsQuery({ page });

  useEffect(() => {
    if (products) {
      setAllProducts((prevProducts) => [...prevProducts, ...products]);
    }
  }, [products]);

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <section className="home-product">
      <Container maxW={"1200px"}>
        <motion.h1>Все продукты</motion.h1>
        <GridProduct>
          {isLoading && !allProducts.length ? (
            <div>...Loading</div>
          ) : (
            allProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))
          )}
        </GridProduct>
        <Box display={"flex"} justifyContent={"center"}>
          {isFetching ? (
            <div>...Loading</div>
          ) : (
            <button className="show-product_btn" onClick={handleShowMore}>
              показать еще 10
            </button>
          )}
        </Box>
      </Container>
    </section>
  );
});

Product.displayName = "Product";
export default Product;
