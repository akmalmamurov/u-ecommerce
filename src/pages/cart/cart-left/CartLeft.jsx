import React, { useCallback } from "react";
import {
  Box,
  Checkbox,
  useDisclosure,
  Text,
  Center,
  Divider,
  Heading,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  CartEmptyIcon,
  ProductFavouritActiveIcon,
  CartFavouriteIcon,
  CartDeleteIcon,
} from "../../../assets/icons";
import { useDeleteBasketMutation } from "../../../redux/services/basketServices";
import { toggleFavourit } from "../../../redux/slices/favouritSlices";
import {
  decrementQuantity,
  deleteItem,
  incrementQuantity,
  resetCart,
} from "../../../redux/slices/productSlices";
import theme from "../../../theme";
import { kFormatter } from "../../../utils";
import CartModal from "../cart-modal/CartModal";
import "./CartLeft.scss";

const CartLeft = ({
  products,
  checkedItems,
  handleCheckboxChange,
  handleChangeAll,
  checkedProductsCount,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const favourites = useSelector((state) => state.favourit.favourites);
  const [deleteBasket] = useDeleteBasketMutation();
  const dispatch = useDispatch();
  const handleFavoriteToggle = useCallback(
    (item) => {
      dispatch(toggleFavourit(item));
    },
    [dispatch]
  );

  const allProductDelete = useCallback(() => {
    if (products.length === 0) return;

    products.forEach((item) => {
      deleteBasket({ product_id: item.id });
      dispatch(deleteItem(item.id));
    });
    dispatch(resetCart());
  }, [products, deleteBasket, dispatch]);

  return (
    <Box className="cart-left">
      <Box
        className="card-top"
        display={"flex"}
        justifyContent={"space-between"}
      >
        <Box display={"flex"} alignItems={"center"} gap={"16px"}>
          <Checkbox
            isChecked={checkedItems.every(Boolean)}
            isIndeterminate={
              checkedItems.some(Boolean) && !checkedItems.every(Boolean)
            }
            onChange={handleChangeAll}
          />
          <Text className="card-top_text" color={theme.colors.deepBlack}>
            Всего: {checkedProductsCount} товара
          </Text>
        </Box>
        <Box onClick={onOpen}>
          <button className="cart-button_text">
            <CartEmptyIcon />
            <span>Очистить корзину</span>
          </button>
        </Box>
      </Box>
      <CartModal
        allProductDelete={allProductDelete}
        onClose={onClose}
        isOpen={isOpen}
      />
      {products?.map((item, index) => (
        <Box key={item.id} className="cart-left_main">
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box display={"flex"} gap={"16px"} alignItems={"center"}>
              <Checkbox
                isChecked={checkedItems[index]}
                onChange={() => handleCheckboxChange(index)}
              />
              <img
                src={item.main_image}
                alt={item.name_ru}
                className="cart-left_img"
              />
              <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
                <Heading
                  as={"h2"}
                  className="cart-product_name"
                  cursor={"pointer"}
                  fontFamily={theme.fonts.fInter}
                  color={theme.colors.deepBlack}
                  onClick={() => navigate(`/products/${item.id}`)}
                >
                  {item.name_ru}
                </Heading>
                <Box display={"flex"} gap={"12px"}>
                  <button
                    className={`cart-button_text`}
                    onClick={() => handleFavoriteToggle(item)}
                  >
                    {favourites.some(
                      (favourite) => favourite.id === item.id
                    ) ? (
                      <ProductFavouritActiveIcon />
                    ) : (
                      <CartFavouriteIcon className="cart-button_icon" />
                    )}
                    <span>В избранное</span>
                  </button>
                  <Center height="28px">
                    <Divider orientation="vertical" />
                  </Center>
                  <button
                    onClick={() => dispatch(deleteItem(item.id))}
                    className="cart-button_text"
                  >
                    <CartDeleteIcon className="cart-button_icon" />
                    <span>Удалить</span>
                  </button>
                </Box>
              </Box>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-between"}
            >
              <p className="cart-product_price">
                {kFormatter(item.price * item.quantity)}
              </p>
              <Box display={"flex"} gap={"12px"} alignItems={"center"}>
                <button
                  onClick={() => dispatch(decrementQuantity(item.id))}
                  className="cart-product_btn"
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                <p className="cart-product_quantity">{item.quantity}</p>
                <button
                  onClick={() => dispatch(incrementQuantity(item.id))}
                  className="cart-product_btn"
                  disabled={item.quantity === 10}
                >
                  +
                </button>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default React.memo(CartLeft);
