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
  const handleNameChange = (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-ZА-Яа-я\s]/g, "");
    console.log(e.target.value);
  };

  return (
    <div className="checkout-userdata">
      <FormControl
        isRequired
        isInvalid={errors.name}
        className="checkout-form_control"
      >
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
          {errors.client_phone_number && (
            <span className="error-input">
              {errors.client_phone_number.message}
            </span>
          )}

          {errors.name && errors.name.type === "maxLength" && (
            <span role="alert">Max length exceeded</span>
          )}
        </FormErrorMessage>
      </FormControl>
      <Box display={"flex"} gap={2}>
        <FormControl
          isRequired
          isInvalid={errors.name}
          className="checkout-form_control"
        >
          <FormLabel>Имя</FormLabel>
          <Input
            placeholder="Имя"
            className={`checkout-input ${
              errors.firstName ? "error-input" : ""
            }`}
            {...register("client_first_name", {
              required: "Введите имя",
              pattern: {
                value: /^[a-zA-ZА-Яа-я\s]*$/,
                message: "Имя должно состоять только из букв",
              },
            })}
            onChange={handleNameChange}
          />
          <FormErrorMessage>
            {errors.client_first_name && (
              <span className="error-input">{errors.client_first_name}</span>
            )}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isRequired
          isInvalid={errors.name}
          className="checkout-form_control"
        >
          <FormLabel>Фамилия</FormLabel>
          <Input
            className={`checkout-input ${
              errors.client_last_name ? "error-input" : ""
            }`}
            {...register("client_last_name", {
              required: "Введите фамилию",
              pattern: {
                value: /^[a-zA-ZА-Яа-я\s]*$/,
                message: "Фамилия должна состоять только из букв",
              },
            })}
            onChange={handleNameChange}
          />
          <FormErrorMessage>
          {errors.client_last_name && (
              <span className="error-input">{errors.client_last_name}</span>
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
  handleNameChange: PropTypes.func,
};
export default CheckoutUserData;
