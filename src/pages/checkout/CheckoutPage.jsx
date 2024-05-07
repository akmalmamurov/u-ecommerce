import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import CheckoutTop from "./checkout-top/CheckoutTop";
import theme from "../../theme";
import "./Checkout.scss"
const CheckoutPage = () => {


  return (
    <Box className="checkout-page" >
            <CheckoutTop/>
            <Box className="checkout-page_content" bg={theme.colors.whiteSmoke}>
              <Box className="checkout-container" >
                <Heading as={"h2"} fontFamily={theme.fonts.fInter} color={theme.colors.black} className="checkout-title">Оформление заказа</Heading>
                  <Grid templateColumns={"repeat(2, 1fr)"} gap={"24px"}>
                        <GridItem>
                              <Box>
                                
                              </Box>
                        </GridItem>
                  </Grid>
              </Box>
            </Box>
    </Box>
  );
};

export default CheckoutPage;
