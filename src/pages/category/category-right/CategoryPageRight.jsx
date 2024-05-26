import "./CategoryPageRight.scss";
import PropTypes from "prop-types";
import { Box, Grid, Text } from "@chakra-ui/react";
import ProductCard from "../../../components/card/product-card/ProductCard";
import { Link } from "react-router-dom";

const CategoryPageRight = ({ brand, products }) => {
  return (
    <div>
      {brand && (
        <Box display={"flex"} gap={10} px={10} mb={20}>
          {brand.map((brand, index) => (
            <Link key={index}>{brand.name}</Link>
          ))}
        </Box>
      )}
      <Box>
        {products && products.length > 0 ? (
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {products.map((product) => (
              <div key={product.id} style={{ flex: "0 0 33.33%" }}>
                <ProductCard {...product} />
              </div>
            ))}
          </Grid>
        ) : (
          <Text fontSize="xl" textAlign="center" mt={10}>
            No products available
          </Text>
        )}
      </Box>
    </div>
  );
};

CategoryPageRight.propTypes = {
  brand: PropTypes.array,
  products: PropTypes.array,
  selectedCategoryId: PropTypes.string,
};

export default CategoryPageRight;
