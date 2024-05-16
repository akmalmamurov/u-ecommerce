/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";

import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  GridItem,
  Heading,
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
import { useState } from "react";
import { clickImg, paymeImg } from "../../assets/images";
import MapContainer from "../../components/map-container/MapContainer";
import { useGetBasketQuery } from "../../redux/services/basketServices";
import Footer from "../../components/footer/Footer";
import CheckoutUserData from "./checkout-user/CheckoutUserData";
import { useCallback } from "react";

const CheckoutPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const { data: baskets } = useGetBasketQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [paymentSelected, setPaymentSelected] = useState("Click");
  const [addressData, setAddressData] = useState({});

  const onSubmit = (data) => {
    const payment = paymentSelected;
    const coords = addressData;
    data.coords = coords;
    data.payment = payment;

    console.log(data);
  };
  console.log(errors);

  const handleInputChange = useCallback((e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
  }, []);
  console.log(addressData);

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
                <CheckoutUserData
                  register={register}
                  errors={errors}
                  handleInputChange={handleInputChange}
                />
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
                    <MapContainer setAddressData={setAddressData} />
                  </div>
                </Box>

                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  className="checkout-btn"
                >
                  Подтвердить заказ
                </Button>
              </form>
            </div>
          </GridItem>
          <GridItem colSpan={4}>
            <div className="checkout-right">
              {baskets && (
                <div>
                  <h1>{baskets.name_ru}</h1>
                </div>
              )}
            </div>
          </GridItem>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default CheckoutPage;
