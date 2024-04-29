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
import "../../modal/Modal.css";
import theme from "../../../theme";
import { useAddLoginMutation } from "../../../redux/services/loginServices";
import { memo, useState } from "react";
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
    setPhoneValue(values.phone_number);
    try {
      await addLogin({ source: values.phone_number, type: "phone_number" });
      setIsSuccess(true);
      setOpenVerifyModal(true);
      reset({ phone_number: "" });
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
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
