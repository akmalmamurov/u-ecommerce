import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import CheckoutTop from "./checkout-top/CheckoutTop";
import theme from "../../theme";
import "./Checkout.scss";
import { useForm } from "react-hook-form";

const CheckoutPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleInputChange = (e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
  };

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
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isRequired className="checkout-form_control">
                  <FormLabel>Телефон</FormLabel>
                  <Input
                    className="checkout-input"
                    {...register("phone")}
                    defaultValue="+998"
                    onChange={handleInputChange}
                  />
                </FormControl>
                <Box display={"flex"} gap={2}>
                  <FormControl isRequired className="checkout-form_control">
                    <FormLabel>Имя</FormLabel>
                    <Input
                      placeholder="Имя"
                      className="checkout-input"
                      {...register("name")}
                    />
                  </FormControl>
                  <FormControl isRequired className="checkout-form_control">
                    <FormLabel>Фамилия</FormLabel>
                    <Input
                      placeholder=" Фамилия"
                      className="checkout-input"
                      {...register("lastName")}
                    />
                  </FormControl>
                </Box>
                <Box className="checkout-page_title">
                  <span>2</span>
                  оплаты
                </Box>
                <Box display={"flex"}>
                  <FormControl as="fieldset">
                    <FormLabel as="legend">online</FormLabel>
                    <RadioGroup defaultValue="Sasuke">
                      <HStack spacing="24px">
                        <Radio {...register("payment")} value="Sasuke">Sasuke</Radio>
                        <Radio {...register("payment")} value="Nagato">Nagato</Radio>
                        <Radio  {...register("payment")}value="Itachi">Itachi</Radio>
                        <Radio {...register("payment")} value="Sage of the six Paths">
                          Sage of the six Paths
                        </Radio>
                      </HStack>
                    </RadioGroup>

                    <FormHelperText>
                      Select only if you're a fan.
                    </FormHelperText>
                  </FormControl>
                </Box>
                <Button type="submit">Submit</Button>
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
