/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
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
import MapContainer from "../../components/map-container/MapContainer";

const CheckoutPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [paymentSelected, setPaymentSelected] = useState("Click");
  const [addressData, setAddressData] = useState({});

  const onSubmit = (data) => {
    const payment = paymentSelected;

    data.payment = payment;

    console.log(data);
  };

  const handleMapSubmit = ({ coords, address }) => {
    setAddressData({ coords, address });
    console.log(coords, address);
  };
  const handleInputChange = (e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
  };

  const handlePaymentChange = (value) => {
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
                {/* login */}
                <FormControl isRequired className="checkout-form_control">
                  <FormLabel>Телефон</FormLabel>
                  <Input
                    className={`checkout-input ${
                      errors.phone_number ? "error-input" : ""
                    }`}
                    {...register("phone_number", {
                      required: "Пожалуйста, введите свой номер телефона",
                      maxLength: {
                        value: 13,
                        message: "Введите корректный номер телефона",
                      },
                    })}
                    defaultValue="+998"
                    onChange={handleInputChange}
                  />
                  {errors.phone_number && (
                    <span className="error-message">
                      {errors.phone_number.message}
                    </span>
                  )}
                </FormControl>
                <Box display={"flex"} gap={2}>
                  <FormControl isRequired className="checkout-form_control">
                    <FormLabel>Имя</FormLabel>
                    <Input
                      placeholder="Имя"
                      className={`checkout-input ${
                        errors.firstName ? "error-input" : ""
                      }`}
                      {...register("firstName", { required: "Введите имя" })}
                    />
                    {errors.firstName && (
                      <span className="error-message">
                        {errors.firstName.message}
                      </span>
                    )}
                  </FormControl>
                  <FormControl isRequired className="checkout-form_control">
                    <FormLabel>Фамилия</FormLabel>
                    <Input
                      className={`checkout-input ${
                        errors.lastName ? "error-input" : ""
                      }`}
                      {...register("lastName", { required: "Введите фамилию" })}
                    />
                    {errors.lastName && (
                      <span className="error-message">
                        {errors.lastName.message}
                      </span>
                    )}
                  </FormControl>
                </Box>
                {/* to'lov */}
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
                            value={paymentSelected}
                            onChange={handlePaymentChange}
                          >
                            <Stack
                              direction={"column"}
                              spacing="24px"
                              className="checkout-radio"
                            >
                              <Radio
                                value="Click"
                                className="checkout-modal_radio"
                              >
                                <p>Click</p>
                                <img
                                  src={clickImg}
                                  alt="clickImg"
                                  className="checkout-modal_img"
                                />
                              </Radio>
                              <Radio
                                value="Payme"
                                className="checkout-modal_radio"
                              >
                                <p>Payme</p>
                                <img
                                  src={paymeImg}
                                  alt="paymeImg"
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
                {/* qabul qilish */}
                <Box className="checkout-page_title">
                  <span>3</span>
                  Способ получения
                </Box>
                <Box className="checkout-left_bottom">
                  <RadioGroup value="delivery" mb={"28px"}>
                    <Stack
                      direction="row"
                      justifyContent={"space-between"}
                      className="checkout-radio"
                      defaultValue={"delivery"}
                    >
                      <Radio value="delivery">Доставка</Radio>
                      <Radio value="pickup" isDisabled>
                        Самовывоз из магазина
                      </Radio>
                    </Stack>
                  </RadioGroup>

                  <div className="checkout-delivery">
                    <MapContainer onSubmit={handleMapSubmit} />
                  </div>
                </Box>

                <button className="checkout-btn" type="submit">
                  Подтвердить заказ
                </button>
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
