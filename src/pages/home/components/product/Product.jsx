import { Box, Container } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useGetAllProductsQuery } from "../../../../redux/services/productAllServices";
import GridProduct from "../../../../components/product-grid/GridProduct";
import { ProductCard } from "../../../../components/card/product-card";
import "./Product.scss";
import { memo, useState, useEffect } from "react";
import Loading from "../../../../components/loading/Loading";

const Product = memo(() => {
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState([]);
  const [initialProducts, setInitialProducts] = useState([]);

  const [hasMore, setHasMore] = useState(true);
  const [limit, setLimit] = useState(20);

  const {
    data: products,
    isLoading,
    isFetching,
  } = useGetAllProductsQuery({ page, limit });

  useEffect(() => {
    if (products) {
      setAllProducts((prevProducts) => {
        const productSet = new Set(prevProducts.map((p) => p.id));
        const newProducts = products.filter((p) => !productSet.has(p.id));
        const updatedProducts = [...prevProducts, ...newProducts];

        if (page === 1) {
          setInitialProducts(updatedProducts);
        }

        return updatedProducts;
      });

      setHasMore(products.length >= limit);
    }
  }, [products, page, limit]);

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleHideProducts = () => {
    setAllProducts(initialProducts.slice(0, 20));
    setPage(1);
    setHasMore(true);
  };

  return (
    <section className="home-product">
      <Container maxW={"1200px"}>
        <motion.h1>Все продукты</motion.h1>
        <GridProduct>
          {isLoading && !allProducts.length ? (
            <Loading />
          ) : (
            allProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))
          )}
        </GridProduct>
        <Box display={"flex"} justifyContent={"center"}>
          {isFetching ? (
            <Loading />
          ) : hasMore ? (
            <button className="show-product_btn" onClick={handleShowMore}>
              показать еще 20
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
