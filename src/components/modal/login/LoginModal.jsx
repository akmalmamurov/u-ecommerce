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
import { memo, useCallback, useState, useEffect } from "react";
import VerifyModal from "../verfiy/VerifyModal";

export const LoginModal = memo(({ isOpen, onClose }) => {
  const [phoneValue, setPhoneValue] = useState("+998");
  const [isSuccess, setIsSuccess] = useState(false);
  const [openVerifyModal, setOpenVerifyModal] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone_number: "+998",
    },
  });

  const [addLogin, { isLoading }] = useAddLoginMutation();

  const onSubmit = async (values) => {
    const phone_number = values.phone_number.replace(/^\+/, "");
    setPhoneValue(phone_number);
    try {
      await addLogin({ source: phone_number, type: "phone_number" });
      setIsSuccess(true);
      setOpenVerifyModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = useCallback(
    (e) => {
      const inputValue = e.target.value;
      const sanitizedValue = inputValue.replace(/[^\d+]/g, "");
      if (sanitizedValue.length <= 13) {
        const newValue =
          sanitizedValue && !sanitizedValue.startsWith("+")
            ? "+" + sanitizedValue
            : sanitizedValue;
        setValue("phone_number", newValue);
      }
    },
    [setValue]
  );

  useEffect(() => {
    setValue("phone_number", "+998");
  }, [setValue]);

  useEffect(() => {
    if (!isOpen) {
      reset({ phone_number: "+998" });
    }
  }, [isOpen, reset]);
  const backModal = () => {
    setOpenVerifyModal(false);
    reset({ phone_number: "+998" });
  };
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
                      value: 13,
                      message:
                        "Неверный номер телефона. Проверьте и повторите попытку.",
                    },
                  })}
                  className={`login-input ${
                    errors.phone_number ? "error-input" : ""
                  }`}
                  maxLength={13}
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
                isLoading={isLoading}
                type="submit"
                className="login-button"
                colorScheme="blue"
                height={"56px"}
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
          backModal={backModal}
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
