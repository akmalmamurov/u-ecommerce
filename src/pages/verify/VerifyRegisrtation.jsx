import { useState } from "react";
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
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";

import { LeftArrowIcon } from "../../assets/icons";

export const VerifyRegisrtation = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [verificationStarted, setVerificationStarted] = useState(false);
  const onSubmit = (value) => {
    const { email, pin1, pin2, pin3, pin4, pin5 } = value;
    const fullCode = `${pin1}${pin2}${pin3}${pin4}${pin5}`;
    const requestData = {
      email: email,
      code: fullCode,
    };
    setVerificationStarted(true);
    console.log(requestData);
    setTimeout(() => {}, 120000);
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div>
      <Modal isOpen={false} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <div onClick={goToHome}>
              <LeftArrowIcon cursor={"pointer"} />
            </div>

            <ModalCloseButton />
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
                <FormLabel>Code</FormLabel>
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
              {verificationStarted && (
                <div>Verification countdown started...</div>
              )}
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

VerifyRegisrtation.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default VerifyRegisrtation;
