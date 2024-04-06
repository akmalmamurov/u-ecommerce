import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Box,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import request from "../../server";
import "./Register.css";
import PropTypes from "prop-types";
import theme from "../../theme";
export const Register = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const toast = useToast();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = async (values) => {
    const { phone_number, ...restValues } = values;
    const trimmedValues = Object.fromEntries(
      Object.entries(restValues).map(([key, value]) => [key, value.trim()])
    );
    const processedPhoneNumber = phone_number
      .replace(/\s+/g, "")
      .replace("+", "");
    try {
      const newValues = {
        ...trimmedValues,
        phone_number: processedPhoneNumber,
      };
      await request.post("/auth/register", newValues);
      toast({
        title: "Registered",
        description: "Successfully registered!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      reset();
      navigate("/verify-registration");
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "An error occurred. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <div>
      <Modal
        maxW="407px"
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent fontFamily={theme.fonts.fSF}>
            <ModalHeader fontSize={"32px"} pt={"65px"}>
              Регистрация
            </ModalHeader>
            <ModalCloseButton  className="register-close_button"/>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Ввидите имя</FormLabel>
                <Input
                  {...register("name", {
                    required:
                      "Неверная  имя пользователя . Проверьте ошибки и попробуйте ещё раз.",
                  })}
                  className={`auth-input ${errors.name ? "error-input" : ""}`}
                  placeholder="Имя"
                />
                {errors.name && (
                  <span className="error-message">{errors.name.message}</span>
                )}
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Введите эл.почту</FormLabel>
                <Input
                  {...register("email", {
                    required:
                      "Пожалуйста, заполните адрес электронной почты. адрес электронной почты должен быть написан @.",
                    minLength: {
                      value: 11,
                      message: "Должно быть не менее 13 строк",
                    },
                  })}
                  className={`auth-input ${errors.name ? "error-input" : ""}`}
                  placeholder="example@gmail.com"
                />
                {errors.email && (
                  <span className="error-message">{errors.email.message}</span>
                )}
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Введите номер телефона </FormLabel>

                <Input
                  {...register("phone_number", {
                    value: "+998",
                    required: "Пожалуйста, введите свой номер телефона",
                    maxLength: {
                      value: 13,
                      message: "Minimum length should be 4",
                    },
                  })}
                  className={`auth-input ${errors.name ? "error-input" : ""}`}
                />
                {errors.phone_number && (
                  <span className="error-message">
                    {errors.phone_number.message}
                  </span>
                )}
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Введите пароль</FormLabel>
                <Input
                  {...register("password", {
                    required: `Неверный пароль. Повторите попытку или нажмите на ссылку "Забыли пароль?", чтобы сбросить его.`,
                    minLength: {
                      value: 5,
                      message: "Minimum length should be 4",
                    },
                  })}
                  className={`auth-input ${errors.name ? "error-input" : ""}`}
                  type="password"
                  placeholder=" Пароль"
                />

                {errors.password && (
                  <span className="error-message">
                    {errors.password.message}
                  </span>
                )}
              </FormControl>
            </ModalBody>

            <ModalFooter display={"flex"} flexDirection={"column"}>
              <Button
                mb={"24px"}
                isLoading={isSubmitting}
                type="submit"
                className="auth-button"
                colorScheme="blue"
                mr={3}
              >
                Продолжить
              </Button>

              <Box w={"full"}>
                <Text textAlign={"center"} fontSize={"14px"}>
                  При регистрации вы соглашаетесь с{" "}
                  <span style={{ color: "#0074EB" }}>
                    условиями использования <span style={{color: "#000"}}>и </span> политикой конфиденциальности
                  </span>
                </Text>
              </Box>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </div>
  );
};

Register.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
export default Register;
