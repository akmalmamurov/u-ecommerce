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
} from "@chakra-ui/react";
import "./LoginModal.css";
import theme from "../../../theme";
import { useAddLoginMutation } from "../../../redux/services/loginServices";
import { memo, useCallback, useState } from "react";
import VerifyModal from "../verfiy/VerifyModal";

export const LoginModal = memo(({ isOpen, onClose }) => {
  const [phoneValue, setPhoneValue] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [openVerifyModal, setOpenVerifyModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const [addLogin] = useAddLoginMutation();
  const onSubmit = async (values) => {
    setIsSubmitting(true);
    const phone_number = values.phone_number.replace(/^\+/, "");
    setPhoneValue(phone_number);
    try {
      await addLogin({ source: phone_number, type: "phone_number" });
      setIsSuccess(true);
      setOpenVerifyModal(true);
      reset({ phone_number: "" });
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = useCallback((e) => {
    const inputValue = e.target.value;
    const sanitizedValue = inputValue.replace(/[^\d+]/g, "");
    const newValue =
      sanitizedValue && !sanitizedValue.startsWith("+")
        ? "+" + sanitizedValue
        : sanitizedValue;
    e.target.value = newValue;
  }, []);

  return (
    <div>
      <Modal maxW="407px" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent fontFamily={theme.fonts.fSF} className="login-modal">
            <Box className="login-modal_close">
              <ModalCloseButton className="register-close_button" />
            </Box>
            <ModalHeader className="login-modal_title" fontSize={"32px"}>
              Вход в аккаунт
            </ModalHeader>
            <ModalBody className="login-modal_body">
              <FormControl mt={4}>
                <FormLabel>Введите номер телефона </FormLabel>
                <Input
                  {...register("phone_number", {
                    required: "Пожалуйста, введите свой номер телефона",
                    minLength: {
                      value: 12,
                      message:
                        "Неверный номер телефона.Проверьте и повторите попытку.",
                    },
                  })}
                  className={`login-input ${
                    errors.phone_number ? "error-input" : ""
                  }`}
                  defaultValue="+998"
                  onChange={handleInputChange}
                />

                {errors.phone_number && (
                  <span className="error-message">
                    {errors.phone_number.message}
                  </span>
                )}
              </FormControl>
            </ModalBody>
            <ModalFooter
              className="login-modal_footer"
              display={"flex"}
              flexDirection={"column"}
            >
              <Button
                mb={"24px"}
                isLoading={isSubmitting}
                type="submit"
                className="login-button"
                colorScheme="blue"
              >
                Продолжить
              </Button>
              <Box w={"full"}>
                <Text textAlign={"center"} fontSize={"14px"}>
                  Авторизуясь, вы соглашаетесь c{" "}
                  <span style={{ color: "#0074EB" }}>
                    политикой обработки персональных данных
                  </span>
                </Text>
              </Box>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
      {isSuccess && openVerifyModal && (
        <VerifyModal
          source={phoneValue}
          isOpen={isOpen}
          onClose={onClose}
          onOpen={() => setOpenVerifyModal(false)}
        />
      )}
    </div>
  );
});
LoginModal.displayName = "LoginModal";

LoginModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default LoginModal;
