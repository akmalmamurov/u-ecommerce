import PropTypes from "prop-types";
import { Box, FormControl, FormErrorMessage, Input } from "@chakra-ui/react";

import { PaymentPayIcon } from "assets/icons";
import theme from "theme";
import "./PaymentCard.scss";

const PaymentCard = ({ register, errors }) => {
  const handleCardChange = (e, maxLength) => {
    let value = e.target.value.replace(/[^\d]/g, "");
    value = value.replace(/\s/g, "");
    if (value.length > maxLength) {
      value = value.slice(0, maxLength);
    }
    value = value.replace(/(.{4})/g, "$1 "); 
    e.target.value = value.trim(); 
  };

  return (
    <div className="pcard-page">
      <Box className="pcard-content" fontFamily={theme.fonts.fInter}>
        <div className="pcard-item">
          <div className="pcard-input_item">
            <FormControl isInvalid={errors.payment_card_numbers}>
              <Input
                type="text"
                className={`pcard-input ${
                  errors.payment_card_numbers ? "error-input" : ""
                }`}
                placeholder="Номер карты"
                {...register("payment_card_numbers", {
                  required: "Номер карты обязателен",
                  maxLength: {
                    value: 19,
                    message: "Максимальная длина 19 символов",
                  },
                })}
                maxLength={19}
                onChange={(e) => handleCardChange(e, 19)}
              />
              <FormErrorMessage>
                {errors.payment_card_numbers &&
                  errors.payment_card_numbers.message}
              </FormErrorMessage>
            </FormControl>
            <span className="pcard-input_icon">
              <PaymentPayIcon />
            </span>
          </div>
        </div>
      </Box>
    </div>
  );
};

PaymentCard.propTypes = {
  register: PropTypes.func,
  errors: PropTypes.object,
};

export default PaymentCard;
