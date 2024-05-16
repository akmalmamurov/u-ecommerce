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
  const [initialProducts, setInitialProducts] = useState([]);

  const [hasMore, setHasMore] = useState(true);
  const [limit, setLimit] = useState(10);

  const {
    data: products,
    isLoading,
    isFetching,
  } = useGetAllProductsQuery({ page, limit });

  useEffect(() => {
    console.log("Fetched products:", products);
    if (products) {
      setAllProducts((prevProducts) => {
        const productSet = new Set(prevProducts.map((p) => p.id));
        const newProducts = products.filter((p) => !productSet.has(p.id));
        console.log("New products to add:", newProducts);
        return [...prevProducts, ...newProducts];
      });

      if (products.length < limit) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    }
  }, [products, limit]);

  const handleShowMore = () => {
    console.log("Showing more products...");
    setInitialProducts(allProducts);
    setLimit((prevLimit) => prevLimit + 10);
    setPage((prevPage) => prevPage + 1);
  };

  const handleHideProducts = () => {
    console.log("Hiding products...");
    setAllProducts(initialProducts);
    setLimit(10);
    setPage(1);
    setHasMore(true);
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
          ) : hasMore ? (
            <button className="show-product_btn" onClick={handleShowMore}>
              показать еще 10
            </button>
          ) : (
            <button className="show-product_btn" onClick={handleHideProducts}>
              Больше нет продуктов (Скрыть продукты)
            </button>
          )}
        </Box>
      </Container>
    </section>
  );
});

Product.displayName = "Product";
export default Product;
