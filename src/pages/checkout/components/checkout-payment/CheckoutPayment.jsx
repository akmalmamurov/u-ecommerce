import { useState } from "react";

import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  useDisclosure,
  RadioGroup,
  Stack,
  Radio,
  Button,
} from "@chakra-ui/react";
import { clickImg, paymeImg } from "../../../../assets/images";
import { PaymentCardIcon, PaymentCashIcon } from "../../../../assets/icons";
import "./CheckoutPayment.scss";
const CheckoutPayment = ({ handlePaymentTypeChange, paymentType }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [paymentSelected, setPaymentSelected] = useState("Click");

  const handlePaymentChange = (value) => {
    setPaymentSelected(value);
  };
  return (
    <div className="checkout-payment_page">
      <Box className={"checkout-payment_type"}>
        <label
          onClick={onOpen}
          htmlFor="payment-online"
          className="checkout-payment_type-item"
        >
          <PaymentCardIcon />
          <h3 className="">Картой онлайн</h3>
          <input
            id="payment-online"
            type="radio"
            value="online"
            className="payment-type_input"
            onChange={handlePaymentTypeChange}
            checked={paymentType === "online"}
          />
        </label>
        <label
          htmlFor="payment-cash"
          className="checkout-payment_type-item payment-disabled"
        >
          <PaymentCashIcon />
          <h3 className="">При получении</h3>
          <input
            className="payment-type_input"
            id="payment-cash"
            type="radio"
            value="cash"
            onChange={handlePaymentTypeChange}
            disabled={paymentType === "online"}
          />
        </label>
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
                    <Radio value="Click" className="checkout-modal_radio">
                      <p>Click</p>
                      <img
                        src={clickImg}
                        alt="clickImg"
                        className="checkout-modal_img"
                      />
                    </Radio>
                    <Radio value="Payme" className="checkout-modal_radio">
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
    </div>
  );
};

export default CheckoutPayment;
