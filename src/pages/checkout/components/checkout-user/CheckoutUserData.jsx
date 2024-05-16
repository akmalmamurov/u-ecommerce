import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import "./CheckoutUserData.scss";

const CheckoutUserData = ({ register, errors, handleInputChange }) => {
  return (
    <div className="checkout-userdata">
      <FormControl isRequired isInvalid={errors.name} className="checkout-form_control">
        <FormLabel>Телефон</FormLabel>
        <Input
          className={`checkout-input ${
            errors.client_phone_number ? "error-input" : ""
          }`}
          {...register("client_phone_number", {
            required: "enter phone_numer",
            minLength: { value: 12, message: "Minimum length should be 13" },
          })}
          defaultValue="+998"
          onChange={handleInputChange}
        />
        <FormErrorMessage>
          {errors.client_phone_number && errors.client_phone_number.type === "required" && (
            <span className="error-input">Пожалуйста, введите свой номер телефона</span>
          )}
          {errors.name && errors.name.type === "maxLength" && (
        <span role="alert">Max length exceeded</span>
      )}
        </FormErrorMessage>
      </FormControl>
      <Box display={"flex"} gap={2}>
        <FormControl isRequired isInvalid={errors.name} className="checkout-form_control">
          <FormLabel>Имя</FormLabel>
          <Input
            placeholder="Имя"
            className={`checkout-input ${
              errors.firstName ? "error-input" : ""
            }`}
            {...register("client_first_name", { required: "Введите имя" })}
          />
          <FormErrorMessage>
            {errors.client_first_name && errors.client_first_name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={errors.name} className="checkout-form_control">
          <FormLabel>Фамилия</FormLabel>
          <Input
            className={`checkout-input ${errors.client_last_name ? "error-input" : ""}`}
            {...register("client_last_name", { required: "Введите фамилию" })}
          />
          <FormErrorMessage>
            {errors.client_last_name && errors.client_last_name.message}
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
};
export default CheckoutUserData;
