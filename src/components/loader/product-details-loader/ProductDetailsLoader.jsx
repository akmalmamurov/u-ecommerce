import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import "./ProductDetailsLoader.scss"
const ProductsDetailsLoader = () => {
  return (
    <Box className="product-details_loader">
      {Array.from({ length: 2 }).map((_, index) => (
        <Box key={index} padding="6" boxShadow="lg" bg="white"  className="product-details_loader-item">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={5} spacing="4" />
        </Box>
      ))}
    </Box>
  );
};

export default ProductsDetailsLoader;
