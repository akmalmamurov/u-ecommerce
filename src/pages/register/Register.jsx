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
  useDisclosure,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import request from "../../server";
import "./Register.css";
export const Register = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      navigate("/register/verifyRegistration");
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
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal
        maxW="400px"
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>Регистрация</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Ввидите имя</FormLabel>
                <Input
                  {...register("name", {
                    required: "Пожалуйста, введите Ваше имя",
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
                    required:
                      "Пароль должен включать заглавные буквы, цифры и символы. Пожалуйста, попробуйте еще раз",
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

            <ModalFooter>
              <Button
                isLoading={isSubmitting}
                type="submit"
                className="auth-button"
                colorScheme="blue"
                mr={3}
              >
                Продолжить
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </div>
  );
};

export default Register;
