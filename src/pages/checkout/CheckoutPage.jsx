import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  useToast,
} from "@chakra-ui/react";
import CheckoutTop from "./components/checkout-top/CheckoutTop";
import theme from "theme";
import "./Checkout.scss";
import { useState, useCallback, useEffect } from "react";
import Footer from "components/footer/Footer";
import CheckoutUserData from "./components/checkout-user/CheckoutUserData";
import CheckoutPayment from "./components/checkout-payment/CheckoutPayment";
import CheckoutDelivery from "./components/checkout-delivery/CheckoutDelivery";
import MapContainer from "components/map-container/MapContainer";
import CheckoutProduct from "./components/checkout-product/CheckoutProduct";
import { useAddOrderMutation } from "../../redux/services/orderServices";
import { useDispatch, useSelector } from "react-redux";
import { deleteItems } from "../../redux/slices/productSlices";
import { useGetBasketQuery } from "../../redux/services/basketServices";
import PaymentCard from "./components/payment-card/PaymentCard";
import CheckoutSucessModal from "./components/checkout-sucess-modal/CheckoutSucessModal";
import { useModal } from "../../hooks/useModal";
import { useGetClientQuery } from "../../redux/services/clientServices";

const CheckoutPage = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const { data: { products, total_price } = {} } = useGetBasketQuery();
  const { data: client } = useGetClientQuery();

  const [addOrder] = useAddOrderMutation();
  const [addressData, setAddressData] = useState({});
  const [clStreet, setClStreet] = useState("");
  const [paymentType, setPaymentType] = useState("card");
  const [paymentCardType, setPaymentCardType] = useState("Click");
  const toast = useToast();
  const { phoneNumber, isAuth } = useSelector((state) => state.auth);
  const {
    isOpen: isFinishOpen,
    open: openFinish,
    close: closeFinish,
  } = useModal();
  const dispatch = useDispatch();
  const { refetch: refetchClient } = useGetClientQuery();

  useEffect(() => {
    refetchClient();
  }, [refetchClient]);

  useEffect(() => {
    if (client) {
      reset({
        name: client.name || "",
        surname: client.surname || "",
        phone_number: client.phone_number || "",
      });
    }
  }, [client, reset]);
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
      await addOrder(data);
      const productIds = products.map((product) => product.id);
      dispatch(deleteItems(productIds));
      openFinish();
      reset({
        client_first_name: client.name || "",
        client_last_name: client.surname || "",
      });
      refetchClient();
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast({
          title: "Validation Error",
          description: "Malumotlar to'g'ri kiritilmadi.",
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "Error",
          description: err.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
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
        <div className="checkout-grid">
          <div className="checkout-left">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Box className="checkout-page_title">
                <span>1</span>
                Ваши данные
              </Box>
              <div className="checkout-left_container">
                <CheckoutUserData
                  register={register}
                  errors={errors}
                  handleInputChange={handleInputChange}
                  phoneNumber={phoneNumber}
                  isAuth={isAuth}
                  client={client}
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
                <PaymentCard register={register} errors={errors} />

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
              </div>
              <Button
                type="submit"
                isLoading={isSubmitting}
                className="checkout-btn"
              >
                Подтвердить заказ
              </Button>
            </form>
          </div>

          <div className="checkout-right">
            <CheckoutProduct products={products} total_price={total_price} />
          </div>
        </div>
        <CheckoutSucessModal isOpen={isFinishOpen} onClose={closeFinish} />
      </Container>
      <Footer />
    </Box>
  );
};

export default CheckoutPage;
