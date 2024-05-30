import { Grid } from "@chakra-ui/react";
import PropTypes from "prop-types"
const GridBrand = ({children}) => {
  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
     {children}
    </Grid>
  );
};
GridBrand.propTypes = {
  children: PropTypes.node,
}
export default GridBrand;
