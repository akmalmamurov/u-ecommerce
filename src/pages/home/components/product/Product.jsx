import "./Product.scss";
import { useGetAllProductsQuery } from "../../../../redux/services/productAllServices";
import { ProductCard } from "../../../../components/card/product-card";
import { Container } from "@chakra-ui/react";
import GridProduct from "../../../../components/product-grid/GridProduct";
const Product = () => {
  const { data: products, isLoading } = useGetAllProductsQuery();
  return (
    <section className="home-product">
      <Container maxW={"1200px"}>
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
