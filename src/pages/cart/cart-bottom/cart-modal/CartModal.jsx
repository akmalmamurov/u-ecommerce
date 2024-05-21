import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import "./CartModal.scss"
import PropTypes from "prop-types"
const CartModal = ({onClose,isOpen}) => {
  return (
    <div className="cart-modal">
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h1>asddsadsa</h1>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

CartModal.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool
}

export default CartModal