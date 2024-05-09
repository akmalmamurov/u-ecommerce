import { Box, Button, Container, Divider, FormControl, FormLabel, Grid, GridItem, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import CheckoutTop from "./checkout-top/CheckoutTop";
import theme from "../../theme";
import "./Checkout.scss";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { clickImg, paymeImg } from "../../assets/images";

const CheckoutPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [paymentSelected, setPaymentSelected] = useState(null);

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleInputChange = (e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
  };

  const handlePaymentSelect = (value) => {
    setPaymentSelected(value);
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
                  Oплаты
                </Box>
                <Box display={"flex"} className="checkout-payment">
                  {paymentSelected && (
                    <div className="payment-selected">
                      <img
                        src={paymentSelected === "Click" ? clickImg : paymeImg}
                        alt={paymentSelected}
                      />
                      <p>{paymentSelected}</p>
                    </div>
                  )}
                  <button className="checkout-change_btn" onClick={onOpen}>
                    Изменить
                  </button>
                  <Modal size={"sm"} isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay className="checkout-modal" />
                    <ModalContent className="checkout-modal_content">
                      <ModalHeader>Картой онлайн</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody className="checkout-modal_body">
                        <FormControl as="fieldset">
                          <RadioGroup
                            defaultValue={
                              paymentSelected
                                ? paymentSelected
                                : setPaymentSelected("Click")
                            }
                            onChange={(value) => handlePaymentSelect(value)}
                          >
                            <Stack
                              direction={"column"}
                              spacing="24px"
                              className="checkout-radio"
                            >
                              <Radio
                                {...register("payment")}
                                value="Click"
                                className="checkout-modal_radio"
                              >
                                <p>Click</p>
                                <img
                                  src={clickImg}
                                  alt=""
                                  className="checkout-modal_img"
                                />
                              </Radio>
                              <Radio {...register("payment")} value="Payme">
                                <p>Payme</p>
                                <img
                                  src={paymeImg}
                                  alt=""
                                  className="checkout-modal_img"
                                />
                              </Radio>
                            </Stack>
                          </RadioGroup>
                        </FormControl>
                      </ModalBody>
                      <ModalFooter w="100%">
                        <Button w="100%" onClick={onClose}>
                          Выбрать
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
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
