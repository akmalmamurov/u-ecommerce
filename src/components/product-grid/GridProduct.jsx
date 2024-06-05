import PropTypes from "prop-types";

import { SimpleGrid } from "@chakra-ui/react";

const GridProduct = ({ children }) => {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="4">
      {children}
    </SimpleGrid>
  );
};
GridProduct.propTypes = {
  children: PropTypes.node,
};
export default GridProduct;
