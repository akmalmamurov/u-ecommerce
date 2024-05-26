import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import "./CheckoutSucessModal.scss";
import theme from "../../../../theme";
import { Link } from "react-router-dom";
import { SucessCheckIcon } from "../../../../assets/icons";
const CheckoutSucessModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      className="checkout-sucess-modal"
    >
      <ModalOverlay />
      <ModalContent
        className="sucess-modal_content"
        fontFamily={theme.fonts.fInter}
      >
        <ModalHeader className="sucess-modal_header">
          <span className="sucess-modal_icon">
            <SucessCheckIcon />
          </span>
          <h1 className="sucess-modal_title">Спасибо за заказ!</h1>
        </ModalHeader>
        <ModalFooter className="sucess-modal_footer">
          <Link to={"/orders"} className="sucess-modal_btn">Мои заказы</Link>
          <Link to={"/"} className="sucess-modal_btn">Продолжить</Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

CheckoutSucessModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
export default CheckoutSucessModal;
