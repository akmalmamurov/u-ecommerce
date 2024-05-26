import { Box, FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import PropTypes from "prop-types";
import "./PaymentCard.scss";
import theme from "../../../../theme";
import { PaymentPayIcon } from "../../../../assets/icons";

const PaymentCard = ({ register, errors }) => {
  const handleCardChange = (e, maxLength) => {
    let value = e.target.value.replace(/[^\d]/g, ""); // Remove all non-numeric characters
    value = value.replace(/\s/g, ""); // Remove all spaces
    if (value.length > maxLength) {
      value = value.slice(0, maxLength); // Trim the value if it exceeds maxLength
    }
    value = value.replace(/(.{4})/g, "$1 "); // Add space after every 4 characters
    e.target.value = value.trim(); // Remove leading and trailing spaces
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
                    value: 19, // Increased maxLength to accommodate spaces
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
