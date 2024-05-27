import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import {
  Button,
  FormControl,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  Box,
  ModalOverlay,
  PinInput,
  PinInputField,
  Text,
} from "@chakra-ui/react";
import { LeftArrowIcon, TelegramModaIcon } from "../../../assets/icons";
import { useAddVerifyMutation } from "../../../redux/services/verifyServices";
import { useDispatch } from "react-redux";
import { setAuth, setPhoneNumber } from "../../../redux/slices/authSlices";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { TOKEN } from "../../../constants";
import { useEffect, useState } from "react";
import "./VerifyModal.scss";
import theme from "../../../theme";
import { useAddLoginMutation } from "../../../redux/services/loginServices";

const VerifyModal = ({ isOpen, onClose, source, onOpen, backModal }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const dispatch = useDispatch();
  const [addVerify] = useAddVerifyMutation();
  const [addLogin, { isLoading }] = useAddLoginMutation();
  const [timer, setTimer] = useState(60);
  const [showResend, setShowResend] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimer(60);
      setShowResend(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else {
      setShowResend(true);
    }
  }, [timer]);

  const onSubmit = async (value) => {
    const fullCode = Object.values(value).join("");
    const requestData = {
      source: source,
      type: "phone_number",
      code: fullCode,
    };
    try {
      const res = await addVerify(requestData);
      if (res.error) {
        console.log(res.error);
        return;
      }
      Cookies.set(TOKEN, res.data.token, { expires: 7 });
      dispatch(setAuth());
      dispatch(setPhoneNumber(source));
      onClose();
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  const handleResend = async () => {
    try {
      await addLogin({ source: source, type: "phone_number" });
      setTimer(60);
      setShowResend(false);
      reset();
    } catch (err) {
      console.log(err);
    }
  };
  const handleLoginOpen = () => {
    onOpen();
  };

  return (
    <div>
      <Modal w={"455px"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent
            px={"40px"}
            className="verify-modal"
            fontFamily={theme.fonts.fInter}
          >
            <Box className="verify-modal_header">
              <div onClick={backModal}>
                <LeftArrowIcon cursor={"pointer"} />
              </div>
              <Text fontFamily={theme.fonts.fInter} className="verify-modal_title">
                Введите код
              </Text>
            </Box>

            <Box className="verify-modal_close">
              <ModalCloseButton className="verify-modal_close-button" />
            </Box>

            <ModalBody className="verify-modal_body">
              <FormControl>
                <HStack spacing={4} className="verify-input_wrapper">
                  <PinInput placeholder="">
                    {[1, 2, 3, 4, 5, 6].map((index) => (
                      <PinInputField
                        key={index}
                        className={`verify-input ${
                          timer === 0 && Object.keys(errors).length === 0
                            ? "error-input"
                            : errors[`pin${index}`]
                            ? "error-input"
                            : ""
                        }`}
                        {...register(`pin${index}`, { required: "Enter code" })}
                      />
                    ))}
                  </PinInput>
                </HStack>
                {errors.code && (
                  <span className="error-message">{errors.code.message}</span>
                )}
              </FormControl>
              {timer > 0 ? (
                <Link onClick={handleLoginOpen} className="verify-modal_link">
                  Изменить номер телефона
                </Link>
              ) : (
                <span className="error-message verify-modal_error">
                  Время истекло
                </span>
              )}

              <div className="verify-modal_timer">
                {showResend ? (
                  <Link
                    className="verify-modal_timer-link"
                    onClick={handleResend}
                  >
                    Отправить еще раз
                  </Link>
                ) : (
                  timer > 0 && (
                    <span>
                      {String(Math.floor(timer / 60)).padStart(2, "0")}:
                      {String(timer % 60).padStart(2, "0")}
                    </span>
                  )
                )}
              </div>
            </ModalBody>

            <ModalFooter className="verify-modal_footer">
            

              <Button
                className="verify-modal_button"
                type="submit"
                isLoading={isSubmitting}
              >
                Подвердить
              </Button>
              <Button className="verify-modal_button">
                <Link
                  className="verify-modal_button-link"
                  to={"https://t.me/ulabMarket_bot"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TelegramModaIcon />
                  Войти через Telegram
                </Link>
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </div>
  );
};

VerifyModal.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  source: PropTypes.string,
};

export default VerifyModal;
