import "./Product.scss";
import { useGetAllProductsQuery } from "../../../../redux/services/productAllServices";
import { ProductCard } from "../../../../components/card/product-card";
import { Container, Grid } from "@chakra-ui/react";
const Product = () => {
  const { data: products, isLoading } = useGetAllProductsQuery();
  console.log(products);
  return (
    <section className="home-product">
      <Container maxW={"1200px"}>
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        {products?.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
        </Grid>
      </Container>
    </section>
  );
};

export default Product;
