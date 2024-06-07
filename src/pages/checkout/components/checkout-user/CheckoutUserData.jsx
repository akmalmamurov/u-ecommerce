import PropTypes from "prop-types";
import { Box, FormControl, FormErrorMessage, FormLabel, Input, } from "@chakra-ui/react";

import "./CheckoutUserData.scss";
const CheckoutUserData = ({ register, errors, handleInputChange, phoneNumber, isAuth, client, }) => {
  const handleNameChange = (e, maxLength) => {
    e.target.value = e.target.value.replace(/[^a-zA-ZА-Яа-я\s]/g, "");
    if (e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }
  };

  return (
    <div className="checkout-userdata">
      <FormControl isRequired isInvalid={errors.client_phone_number} className="checkout-form_control">
        <FormLabel>Телефон</FormLabel>
        <Input className={`checkout-input ${ errors.client_phone_number ? "error-input" : "" }`}
         {...register("client_phone_number", {})}
         value={`+${phoneNumber}`} maxLength={13}
         onChange={handleInputChange}
         readOnly={isAuth}
        />
        <FormErrorMessage>
          {errors.client_phone_number && (
            <span className="error-input">
              {errors.client_phone_number.message}
            </span>
          )}
        </FormErrorMessage>
      </FormControl>
      <Box display={"flex"} gap={2}>
        <FormControl isRequired isInvalid={errors.client_first_name} className="checkout-form_control" >
          <FormLabel>Имя</FormLabel>
          <Input
            placeholder="Имя"
            className={`checkout-input ${
              errors.client_first_name ? "error-input" : ""
            }`}
            {...register("client_first_name", {
              required: "Введите имя",
              maxLength: {
                value: 16,
                message: "Максимальная длина 16 символов",
              },
            })}
            maxLength={16}
            onChange={(e) => handleNameChange(e, 16)}
            defaultValue={client?.name || ""}
          />
          <FormErrorMessage>
            {errors.client_first_name && (
              <span className="error-input">
                {errors.client_first_name.message}
              </span>
            )}
          </FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={errors.client_last_name} className="checkout-form_control">
          <FormLabel>Фамилия</FormLabel>
          <Input
            placeholder="Фамилия"
            className={`checkout-input ${
              errors.client_last_name ? "error-input" : ""
            }`}
            {...register("client_last_name", {
              required: "Введите фамилию",
              pattern: {
                value: /^[a-zA-ZА-Яа-я\s]*$/,
                message: "Фамилия должна состоять только из букв",
              },
              maxLength: {
                value: 16,
                message: "Максимальная длина 16 символов",
              },
            })}
            maxLength={16}
            onChange={(e) => handleNameChange(e, 16)}
            defaultValue={client?.surname || ""}
          />

          <FormErrorMessage>
            {errors.client_last_name && (
              <span className="error-input">
                {errors.client_last_name.message}
              </span>
            )}
          </FormErrorMessage>
        </FormControl>
      </Box>
    </div>
  );
};

CheckoutUserData.propTypes = {
  register: PropTypes.func,
  errors: PropTypes.object,
  handleInputChange: PropTypes.func,
  phoneNumber: PropTypes.string,
  isAuth: PropTypes.bool,

  client: PropTypes.object,
};

export default CheckoutUserData;
