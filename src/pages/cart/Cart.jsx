/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useCallback, useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  useToast,
} from "@chakra-ui/react";

import {
  useAddBasketMutation,
  useAllDeleteBasketMutation,
} from "../../redux/services/basketServices";
import LoginModal from "components/modal/login/LoginModal";
import { calculateTotalPrice, kFormatter } from "utils";
import CartBottom from "./cart-bottom/CartBottom";
import EmptyCart from "./empty-cart/EmptyCart";
import CartLeft from "./cart-left/CartLeft";
import { useModal } from "hooks/useModal";
import theme from "theme";
import "./Cart.scss";

const CartPage = memo(() => {
  const products = useSelector((state) => state.product.products);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [addBasket, { isLoading }] = useAddBasketMutation();
  const [allDeleteBasket] = useAllDeleteBasketMutation();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalAdditionalPrice, setTotalAdditionalPrice] = useState(0);
  const [checkedItems, setCheckedItems] = useState([]);
  const navigate = useNavigate();
  const toast = useToast();
  const {
    isOpen: isLoginOpen,
    open: openLogin,
    close: closeLogin,
  } = useModal();
  useEffect(() => {
    if (products) {
      setCheckedItems(products.map(() => true));
    }
  }, [products]);

  useEffect(() => {
    const { totalPrice, totalAdditionalPrice } = calculateTotalPrice(
      products,
      checkedItems
    );
    setTotalPrice(totalPrice);
    setTotalAdditionalPrice(totalAdditionalPrice);
  }, [products, checkedItems]);

  const handleCheckboxChange = useCallback(
    (index) => {
      const newCheckedItems = [...checkedItems];
      newCheckedItems[index] = !newCheckedItems[index];
      setCheckedItems(newCheckedItems);
    },
    [checkedItems]
  );

  const handleChangeAll = useCallback((e) => {
    const isChecked = e.target.checked;
    setCheckedItems(products.map(() => isChecked));
  }, [products]);
  const goToCheckout = async () => {
    if (!isAuth) {
      openLogin();
      return;
    }
    const selectedProducts = products.filter(
      (item, index) => checkedItems[index]
    );
    if (selectedProducts.length === 0) {
      toast({
        title: "Please select at least one product to proceed to checkout.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      await allDeleteBasket().unwrap();
      const requests = selectedProducts.map((item) =>
        addBasket({ product_id: item.id, quantity: item.quantity }).unwrap()
      );
      await Promise.all(requests);

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
      } else {
        toast({
          title: "Error",
          description: "Failed to proceed to checkout. Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };
  const checkedProductsCount = products.reduce((count, item, index) => {
    return checkedItems[index] ? count + 1 : count;
  }, 0);
  const cartLeftProps = useMemo(
    () => ({
      checkedItems,
      handleCheckboxChange,
      handleChangeAll,
      checkedProductsCount,
      products,
    }),
    [
      checkedItems,
      handleCheckboxChange,
      handleChangeAll,
      checkedProductsCount,
      products,
    ]
  );
  return (
    <Box className="cart-page" fontFamily={theme.fonts.fInter}>
      <Container maxW={"1200px"}>
        {products?.length > 0 ? (
          <>
            <Grid templateColumns="repeat(12,1fr)" gap={"24px"}>
              <GridItem colSpan={7}>
                <CartLeft {...cartLeftProps} />
              </GridItem>
              <GridItem colSpan={5}>
                <Box className={`cart-right `}>
                  <Box className="cart-right_main">
                    <div className="cart-right_item">
                      <h2>Итого</h2>
                      <p className="cart-right_price">
                        {kFormatter(totalPrice)}
                      </p>
                    </div>
                    <div className="cart-right_item">
                      <p className="cart-right_tovar">
                        Товары, {checkedProductsCount} шт
                      </p>
                      <p className="cart-right_additional">
                        {kFormatter(totalAdditionalPrice)}
                      </p>
                    </div>
                    <Box pt={"16px"}>
                      <Button
                        isLoading={isLoading}
                        onClick={goToCheckout}
                        className={`cart-right_btn ${
                          checkedItems.includes(true) ? "" : "disabled"
                        }`}
                        disabled={!checkedItems.includes(true)}
                      >
                        Перейти к оформлению
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </GridItem>
            </Grid>
            <Box py={"64px"}>
              <CartBottom />
            </Box>
          </>
        ) : (
          <EmptyCart />
        )}
      </Container>
      <LoginModal isOpen={isLoginOpen} onClose={closeLogin} />
    </Box>
  );
});

CartPage.displayName = "CartPage";
export default CartPage;
