import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Button, useToast } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

import {
  useAddBasketMutation,
  useAllDeleteBasketMutation,
} from "../../redux/services/basketServices";
import { deleteItem } from "../../redux/slices/productSlices";
import { kFormatter } from "../../utils";
import theme from "../../theme";
import "./CartMenu.scss";
import LoginModal from "../modal/login/LoginModal";
import { useModal } from "../../hooks/useModal";

const CartMenu = ({ items }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [allDeleteBasket] = useAllDeleteBasketMutation();
  const [addBasket, { isLoading }] = useAddBasketMutation();
  const { isOpen, open, close } = useModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const goProductDetails = (id) => {
    navigate(`/products/${id}`);
  };

  const productToCheckout = async () => {
    if (!isAuth) {
      open();
      return; // Ensure the function exits here if not authenticated
    }

    try {
      await allDeleteBasket().unwrap();
      for (const item of items) {
        await addBasket({
          product_id: item.id,
          quantity: item.quantity,
        }).unwrap();
      }
      navigate("/checkout");
    } catch (err) {
      console.error(err);
      if (err.status === 413) {
        toast({
          title: "Quantity Error",
          description: err.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <div className="cart-menu">
      {items.length > 0 ? (
        <>
          {items.map((item) => (
            <div key={item.id} className="cart-menu-item">
              <div
                className="cart-menu_content"
                onClick={() => goProductDetails(item.id)}
              >
                <div className="cart-menu_left">
                  <img
                    src={item.main_image}
                    alt={item.name}
                    className="cart-menu-item-image"
                  />
                  <div className="cart-menu-item-details">
                    <p>{item.name_ru}</p>
                    <p className="cart-menu-item-price">
                      {kFormatter(item.price)}
                    </p>
                  </div>
                </div>
                <div className="cart-menu_right">
                  <DeleteIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(deleteItem(item.id));
                    }}
                    className="cart-menu-delete"
                    sx={{
                      cursor: "pointer",
                      color: "rgba(128, 128, 128, 0.404)",
                      _hover: { color: "black" },
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="cart-menu_bottom">
            <Button
              onClick={productToCheckout}
              isLoading={isLoading}
              className="cart-menu_btn"
              bg={theme.colors.skyBlue}
              color={theme.colors.cascadWhite}
            >
              Оформить Заказ
            </Button>
          </div>
        </>
      ) : (
        <div></div>
      )}
      <LoginModal isOpen={isOpen} onClose={close} />
    </div>
  );
};

CartMenu.propTypes = {
  items: PropTypes.array,
};

export default CartMenu;
