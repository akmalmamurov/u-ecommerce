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
      <FormControl isInvalid={errors.name} className="checkout-form_control">
        <FormLabel>Телефон</FormLabel>
        <Input
          className={`checkout-input ${
            errors.phone_number ? "error-input" : ""
          }`}
          {...register("phone_number", {
            required: true,
            minLength: { value: 13, message: "Minimum length should be 13" },
          })}
          defaultValue="+998"
          onChange={handleInputChange}
        />
        <FormErrorMessage>
          {errors.phone_number && errors.phone_number.type === "required" && (
            <span className="error-input">Пожалуйста, введите свой номер телефона</span>
          )}
          {errors.name && errors.name.type === "maxLength" && (
        <span role="alert">Max length exceeded</span>
      )}
        </FormErrorMessage>
      </FormControl>
      <Box display={"flex"} gap={2}>
        <FormControl isRequired className="checkout-form_control">
          <FormLabel>Имя</FormLabel>
          <Input
            placeholder="Имя"
            className={`checkout-input ${
              errors.firstName ? "error-input" : ""
            }`}
            {...register("firstName", { required: "Введите имя" })}
          />
          <FormErrorMessage>
            {errors.firstName && errors.firstName.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isRequired className="checkout-form_control">
          <FormLabel>Фамилия</FormLabel>
          <Input
            className={`checkout-input ${errors.lastName ? "error-input" : ""}`}
            {...register("lastName", { required: "Введите фамилию" })}
          />
          <FormErrorMessage>
            {errors.lastName && errors.lastName.message}
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
