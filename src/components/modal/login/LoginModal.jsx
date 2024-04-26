import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
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
  useToast,
} from "@chakra-ui/react";
import "../../modal/Modal.css";
import theme from "../../../theme";
import { useAddLoginMutation } from "../../../redux/services/loginServices";

export const LoginModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [addLogin] = useAddLoginMutation();
  const onSubmit = async (values) => {
    console.log(values);
    try {
      const response = await addLogin(values);
      if (response.error) {
        console.error(response.error);
        toast({
          title: "Error",
          description: "An error occurred. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Login",
          description: "Successfully registered!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        reset();
        navigate("/verify-code");
      }
    } catch (err) {
      console.error(err);
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
                    value: "9989",
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
