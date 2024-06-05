import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const SkeletonLoader = () => {
  return (
    <>
      {Array.from({ length: 20 }).map((_, index) => (
        <Box key={index} padding="6" boxShadow="lg" bg="white">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
        </Box>
      ))}
    </>
  );
};

export default SkeletonLoader;
