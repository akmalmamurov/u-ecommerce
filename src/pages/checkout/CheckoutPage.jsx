import {
  Box,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import CheckoutTop from "./checkout-top/CheckoutTop";
import theme from "../../theme";
import "./Checkout.scss";
const CheckoutPage = () => {
  return (
    <Box className="checkout-page">
      <Container maxW={"1200px"}>
        <CheckoutTop />
        <Heading
          as={"h2"}
          fontFamily={theme.fonts.fInter}
          color={theme.colors.black}
          className="checkout-title"
        >
          Оформление заказа
        </Heading>
      </Container>
      <Divider mb={"24px"} />
      <Container maxW={"1200px"}>
        <Grid
          templateColumns={"repeat(12, 1fr)"}
          fontFamily={theme.fonts.fInter}
        >
          <GridItem colSpan={8}>
            <div className="checkout-left">
              <Box className="checkout-page_title">
                <span>1</span>
                Ваши данные
              </Box>
              <form>
                <FormControl isRequired>
                  <FormLabel>Телефон</FormLabel>
                  <Input
                    defaultValue="+998"
                    type="tel"
                    pattern="[0-9]{3}[0-9]{2}[0-9]{3}"
                  />
                </FormControl>
              </form>
            </div>
          </GridItem>
          <GridItem colSpan={4}>1</GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default CheckoutPage;
