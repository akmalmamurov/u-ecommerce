import PropTypes from "prop-types";
import {
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
import { useState, useEffect } from "react";

const CheckoutPayment = ({
  handlePaymentTypeChange,
  paymentType,
  setPaymentCardType,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOnlinePayment, setSelectedOnlinePayment] = useState("Click");

  useEffect(() => {
    setPaymentCardType(selectedOnlinePayment);
  }, [selectedOnlinePayment, setPaymentCardType]);

  const handlePaymentChange = (value) => {
    setSelectedOnlinePayment(value);
  };

  return (
    <div className="checkout-payment_page">
      <div className={"checkout-payment_type"}>
        <label
          onClick={() => {
            onOpen();
            handlePaymentTypeChange({ target: { value: "online" } });
          }}
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
            checked={paymentType === "online"}
            readOnly
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
            checked={paymentType === "cash"}
            onChange={handlePaymentTypeChange}
            readOnly={paymentType === "online"}
          />
        </label>
      </div>

      <div className="checkout-payment">
        {selectedOnlinePayment && (
          <div className="payment-selected">
            <img
              src={selectedOnlinePayment === "Click" ? clickImg : paymeImg}
              alt={selectedOnlinePayment}
            />
            <p>{selectedOnlinePayment}</p>
          </div>
        )}
        <button type="button" className="checkout-change_btn" onClick={onOpen}>
          Изменить
        </button>
        <Modal
          size={"sm"}
          isOpen={isOpen}
          onClose={onClose}
          className="checkout-modal"
        >
          <ModalOverlay className="checkout-modal" />
          <ModalContent className="checkout-modal_content">
            <ModalHeader>Картой онлайн</ModalHeader>
            <ModalCloseButton />
            <ModalBody className="checkout-modal_body">
              <FormControl as="fieldset">
                <RadioGroup
                  value={selectedOnlinePayment}
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
              <Button type="button" w="100%" onClick={onClose}>
                Выбрать
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

CheckoutPayment.propTypes = {
  handlePaymentTypeChange: PropTypes.func.isRequired,
  paymentType: PropTypes.string.isRequired,
  setPaymentCardType: PropTypes.func.isRequired,
};

export default CheckoutPayment;
