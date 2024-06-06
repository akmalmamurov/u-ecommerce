import PropTypes from "prop-types";
import { SimpleGrid } from "@chakra-ui/react";

const GridCategories = ({ children }) => {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 5 }} spacing="4">
      {children}
    </SimpleGrid>
  );
};

GridCategories.propTypes = {
  children: PropTypes.node,
};

export default GridCategories;
