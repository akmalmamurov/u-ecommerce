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
  Select,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import CheckoutTop from "./checkout-top/CheckoutTop";
import theme from "../../theme";
import "./Checkout.scss";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { clickImg, paymeImg } from "../../assets/images";
import { COUNTRIES } from "../../constants";

const CheckoutPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [paymentSelected, setPaymentSelected] = useState("Click");
  const [selectedRegion, setSelectedRegion] = useState("Город Ташкент");
  const [selectedCity, setSelectedCity] = useState("");

  const onSubmit = (data) => {
    const payment = paymentSelected;
    const region = selectedRegion;

    data.payment = payment;
    data.region = region;

    console.log(data);
  };

  const handleInputChange = (e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
  };

  const handlePaymentChange = (value) => {
    setPaymentSelected(value);
  };

  const handleRegionChange = (e) => {
    const selectedRegion = e.target.value;
    setSelectedRegion(selectedRegion);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setValue("city", e.target.value);
  };

  const findCountry = (region) => {
    return COUNTRIES.find((country) => country.name === region);
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
                  <Box className="checkout-delivery">
                    <h1>Укажите адрес доставки</h1>
                    <Box className="checkout-delivery_content">
                      <Select
                        className="select-region"
                        onChange={handleRegionChange}
                        value={selectedRegion}
                      >
                        {COUNTRIES.map((country, index) => (
                          <option key={index} value={country.name}>
                            {country.name}
                          </option>
                        ))}
                      </Select>

                      <Select
                        placeholder="Выберите"
                        className="select-city"
                        value={selectedCity}
                        onChange={handleCityChange}
                      >
                        {findCountry(selectedRegion)?.cities.map(
                          (city, index) => (
                            <option key={index} value={city}>
                              {city}
                            </option>
                          )
                        )}
                      </Select>
                    </Box>
                  </Box>
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
