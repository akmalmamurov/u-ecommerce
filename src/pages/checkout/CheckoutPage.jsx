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
import { useGetBasketQuery } from "../../redux/services/basketServices";
import Footer from "../../components/footer/Footer";
import CheckoutUserData from "./components/checkout-user/CheckoutUserData";
import { useCallback } from "react";
import CheckoutPayment from "./components/checkout-payment/CheckoutPayment";
import CheckoutDelivery from "./components/checkout-delivery/CheckoutDelivery";
import MapContainer from "../../components/map-container/MapContainer";

const CheckoutPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const { data: { products, total_price } = {} } = useGetBasketQuery();
  const [addressData, setAddressData] = useState({});
  const [clStreet, setClStreet] = useState("");
  const [paymentType, setPaymentType] = useState("online");
  console.log(addressData);
  console.log(clStreet);

  const onSubmit = (data) => {
    const coords = addressData;
    const street = clStreet;
    data.coords = coords;
    data.deliverType = street;
    data.paymentType = paymentType;
    console.log(data);
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
            <div className="checkout-right">
              {products &&
                products.map((product) => (
                  <div key={product.id}>
                    <h1>{product.name_ru}</h1>
                  </div>
                ))}
              {total_price && <h2>Total Price: {total_price}</h2>}
            </div>
          </GridItem>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default CheckoutPage;
