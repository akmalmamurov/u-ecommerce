import React from "react";
import { Box, Skeleton,  } from "@chakra-ui/react";

const NavbarLoader = () => {
  return (
    <Box display="flex" gap="22px">
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index} height="20px" width="100px" />
      ))}
    </Box>
  );
};

export default NavbarLoader;
