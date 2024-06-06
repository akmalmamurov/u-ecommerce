import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import "./AllCategoriesLoader.scss";

const AllCategoriesLoader = () => {
  return (
    <>
      {Array.from({ length: 20 }).map((_, index) => (
        <Box
          key={index}
          boxShadow="lg"
          className="all-category_loader"
        >
          <SkeletonCircle   className="all-category_loader-img"/>
          <SkeletonText mt="4" noOfLines={5} spacing="4" />
        </Box>
      ))}
    </>
  );
};

export default AllCategoriesLoader;
