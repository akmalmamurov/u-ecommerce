import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import "./CartModal.scss";
import PropTypes from "prop-types";
import { deleteImg } from "../../../../assets/images";
import theme from "../../../../theme";
const CartModal = ({ onClose, isOpen, allProductDelete }) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered className="cart-modal">
      <ModalOverlay />
      <ModalContent className="cart-modal_content" fontFamily={theme.fonts.fInter}>
        <ModalBody className="cart-modal_body">
          <div className="cart-modal_img">
            <img src={deleteImg} alt="" />
          </div>
          <h1 className="cart-modal_title">
            Вы точно хотите очистить корзину?
          </h1>
        </ModalBody>
        <ModalFooter className="cart-modal_footer">
          <Button onClick={allProductDelete} className="cart-modal_btn">Да</Button>
          <Button className="cart-modal_btn" onClick={onClose}>Нет</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

CartModal.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  allProductDelete: PropTypes.func,
};

export default CartModal;
