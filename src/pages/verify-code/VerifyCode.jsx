import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  Box,
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";

import { LeftArrowIcon } from "../../assets/icons";

export const VerifyCode = ({ onOpen, onClose, isOpen }) => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = (value) => {
    const { email, pin1, pin2, pin3, pin4, pin5 } = value;
    const fullCode = `${pin1}${pin2}${pin3}${pin4}${pin5}`;
    const requestData = {
      email: email,
      code: fullCode,
    };

    console.log(requestData);
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal w={"455px"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent py={"32px"} px={"40px"}>
            <div onClick={goToHome} style={{ marginLeft: "15px" }}>
              <LeftArrowIcon cursor={"pointer"} />
            </div>
            <Box>
              <ModalCloseButton />
            </Box>

            <ModalHeader>Введите код</ModalHeader>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Enter email</FormLabel>
                <Input
                  {...register("email", {
                    required: "enter email",
                  })}
                  className={`auth-input ${errors.name ? "error-input" : ""}`}
                  type="email"
                  placeholder="email"
                />
                {errors.email && (
                  <span className="error-message">{errors.email.message}</span>
                )}
              </FormControl>

              <FormControl mt={4}>
                <HStack spacing={2}>
                  <PinInput>
                    {[1, 2, 3, 4, 5].map((index) => (
                      <PinInputField
                        key={index}
                        className={`auth-input ${
                          errors[`pin${index}`] ? "error-input" : ""
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
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </div>
  );
};

VerifyCode.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
};

export default VerifyCode;
