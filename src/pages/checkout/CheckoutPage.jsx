/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
} from "@chakra-ui/react";
import CheckoutTop from "./components/checkout-top/CheckoutTop";
import theme from "../../theme";
import "./Checkout.scss";
import { useState } from "react";
import Footer from "../../components/footer/Footer";
import CheckoutUserData from "./components/checkout-user/CheckoutUserData";
import { useCallback } from "react";
import CheckoutPayment from "./components/checkout-payment/CheckoutPayment";
import CheckoutDelivery from "./components/checkout-delivery/CheckoutDelivery";
import MapContainer from "../../components/map-container/MapContainer";
import CheckoutProduct from "./components/checkout-product/CheckoutProduct";
import { useAddOrderMutation } from "../../redux/services/orderServices";

const CheckoutPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const [addOrder] = useAddOrderMutation();
  const [addressData, setAddressData] = useState({});
  const [clStreet, setClStreet] = useState("");
  const [paymentType, setPaymentType] = useState("card");
  console.log(addressData);
  console.log(clStreet);

  const onSubmit = async (data) => {
    const delivery_addr_lat = +addressData.split(",")[0].trim();
    const delivery_addr_long = +addressData.split(",")[1].trim();
    const street = clStreet;
    const clientComment = "Nima Bu";
    data.delivery_addr_lat = delivery_addr_lat;
    data.delivery_addr_long = delivery_addr_long;
    data.delivery_type = street;
    data.payment_type = paymentType;
    data.client_comment = clientComment;

    console.log(data);
    try {
      const response = await addOrder(data);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = useCallback((e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
  }, []);

  const handlePaymentTypeChange = useCallback(
    (e) => {
      const selectedType = e.target.value;
      setPaymentType(selectedType);
    },
    [setPaymentType]
  );

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
          gap={"40px"}
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
                  Выберите способ оплаты
                </Box>
                <CheckoutPayment
                  paymentType={paymentType}
                  handlePaymentTypeChange={handlePaymentTypeChange}
                />

                {/* qabul qilish */}
                <Box mb={"20px"}>
                  <CheckoutDelivery
                    setAddressData={setAddressData}
                    setClStreet={setClStreet}
                  />
                  <div className="checkout-delivery_map">
                    <MapContainer
                      setAddressData={setAddressData}
                      setClStreet={setClStreet}
                    />
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
            <CheckoutProduct />
          </GridItem>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default CheckoutPage;
