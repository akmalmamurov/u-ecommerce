import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useToast } from "@chakra-ui/react";
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Box, } from "@chakra-ui/react";
import "../../modal/Modal.css";
import request from "../../../server";
import theme from "../../../theme";
export const LoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = useCallback(async (values) => {
    console.log(values);
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
      navigate("/verify-code");
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
  }, []);
  return (
    <div>
      <Modal maxW="407px" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent fontFamily={theme.fonts.fSF}>
            <ModalHeader fontSize={"32px"} pt={"65px"}>
              Вход в аккаунт
            </ModalHeader>
            <ModalCloseButton className="register-close_button" />
            <ModalBody pb={6}>
              <FormControl mt={4}>
                <FormLabel>Введите номер телефона </FormLabel>

                <Input
                  {...register("phone_number", {
                    value: "+998",
                    required: "Пожалуйста, введите свой номер телефона",
                    maxLength: {
                      value: 13,
                      message: "Minimum length should be 13",
                    },
                  })}
                  className={`auth-input ${
                    errors.phone_number ? "error-input" : ""
                  }`}
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
                  })}
                  className={`auth-input ${
                    errors.password ? "error-input" : ""
                  }`}
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
                  У вас еще нет аккаунта?{" "}
                  <span style={{ color: "#0074EB" }}>Зарегистрироваться</span>
                </Text>
              </Box>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </div>
  );
};

LoginModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
export default LoginModal;
