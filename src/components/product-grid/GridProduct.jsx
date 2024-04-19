import { Grid } from "@chakra-ui/react";
import PropTypes from "prop-types"
const GridProduct = ({children}) => {
  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
     {children}
    </Grid>
  );
};
GridProduct.propTypes = {
  children: PropTypes.node,
}
export default GridProduct;
