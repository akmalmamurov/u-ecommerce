import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import "./OrderLoader.scss";
const OrderLoader = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <Box
          key={index}
          boxShadow="lg"
          bg="white"
          mb={"24px"}
          className="order-loader"
        >
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
        </Box>
      ))}
    </>
  );
};

export default OrderLoader;
