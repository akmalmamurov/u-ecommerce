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
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import { LeftArrowIcon } from "../../../assets/icons";
import { useAddVerifyMutation } from "../../../redux/services/verifyServices";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slices/authSlices";

const VerifyModal = ({ isOpen, onClose, source, onOpen }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  console.log();
  const dispatch = useDispatch();
  const [addVerify, { isSuccess, isError }] = useAddVerifyMutation();

  const onSubmit = async (value) => {
    const { pin1, pin2, pin3, pin4, pin5, pin6 } = value;
    const fullCode = `${pin1}${pin2}${pin3}${pin4}${pin5}${pin6}`;
    const requestData = {
      source: source,
      type: "phone_number",
      code: fullCode,
    };
    try {
      const response = await addVerify(requestData);
      console.log(response);
      dispatch(setUser(response.data.token));
      onClose();
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Modal w={"455px"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent py={"32px"} px={"40px"}>
            <div onClick={onOpen} style={{ marginLeft: "15px" }}>
              <LeftArrowIcon cursor={"pointer"} />
            </div>
            <Box>
              <ModalCloseButton />
            </Box>

            <ModalHeader>Введите код</ModalHeader>
            <ModalBody pb={6}>
              <FormControl mt={4}>
                <HStack spacing={2}>
                  <PinInput>
                    {[1, 2, 3, 4, 5, 6].map((index) => (
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
              <Button
                type="submit"
                colorScheme="blue"
                mr={3}
                isLoading={isSubmitting}
              >
                Save
              </Button>
              {isSuccess && <span className="success-message">Success!</span>}
              {isError && <span className="error-message">Error!</span>}
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
