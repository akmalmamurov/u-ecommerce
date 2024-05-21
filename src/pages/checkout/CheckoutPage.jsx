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
import { useState, useCallback } from "react";
import Footer from "../../components/footer/Footer";
import CheckoutUserData from "./components/checkout-user/CheckoutUserData";
import CheckoutPayment from "./components/checkout-payment/CheckoutPayment";
import CheckoutDelivery from "./components/checkout-delivery/CheckoutDelivery";
import MapContainer from "../../components/map-container/MapContainer";
import CheckoutProduct from "./components/checkout-product/CheckoutProduct";
import { useAddOrderMutation } from "../../redux/services/orderServices";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteItems } from "../../redux/slices/productSlices";
import { useGetBasketQuery } from "../../redux/services/basketServices";
import { setUser } from "../../redux/slices/authSlices";

const CheckoutPage = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const { data: { products, total_price } = {} } = useGetBasketQuery();
  const [addOrder] = useAddOrderMutation();
  const [addressData, setAddressData] = useState({});
  const [clStreet, setClStreet] = useState("");
  const [paymentType, setPaymentType] = useState("card");
  const [paymentCardType, setPaymentCardType] = useState("Click");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(paymentCardType);

  const onSubmit = async (data) => {
    const delivery_addr_lat = +addressData.split(",")[0].trim();
    const delivery_addr_long = +addressData.split(",")[1].trim();
    const phone_number = data.client_phone_number.replace(/^\+/, "");
    const street = clStreet;
    const clientComment = "";

    data.delivery_addr_lat = delivery_addr_lat;
    data.delivery_addr_long = delivery_addr_long;
    data.delivery_name = street;
    data.delivery_type = "deliver";
    data.payment_type = paymentType;
    data.client_comment = clientComment;
    data.client_phone_number = phone_number;
    data.payment_card_type = paymentCardType;

    try {
      const response = await addOrder(data);
      console.log(response);
      const productIds = products.map((product) => product.id);
      dispatch(deleteItems(productIds));
      dispatch(setUser(data.client_first_name));
      navigate("/");
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = useCallback((e) => {
    const inputValue = e.target.value;
    const sanitizedValue = inputValue.replace(/[^\d+]/g, "");
    const newValue =
      sanitizedValue && !sanitizedValue.startsWith("+")
        ? "+" + sanitizedValue
        : sanitizedValue;
    e.target.value = newValue;
  }, []);

  const handlePaymentTypeChange = useCallback((e) => {
    const selectedType = e.target.value;
    setPaymentType(selectedType);
  }, []);

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
                <CheckoutUserData
                  register={register}
                  errors={errors}
                  handleInputChange={handleInputChange}
                />
                <Box className="checkout-page_title">
                  <span>2</span>
                  Выберите способ оплаты
                </Box>
                <CheckoutPayment
                  paymentType={paymentType}
                  handlePaymentTypeChange={handlePaymentTypeChange}
                  setPaymentCardType={setPaymentCardType}
                />
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
            <CheckoutProduct products={products} total_price={total_price} />
          </GridItem>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default CheckoutPage;
