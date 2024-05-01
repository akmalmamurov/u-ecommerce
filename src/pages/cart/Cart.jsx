import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Box,
  Center,
  Checkbox,
  Container,
  Divider,
  Grid,
  GridItem,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  CartArrowLeftIcon,
  CartDeleteIcon,
  CartEmptyIcon,
  CartFavouritIcon,
  CartSucessIcon,
} from "../../assets/icons";
import theme from "../../theme";
import { emptyCart } from "../../assets/images";
import "./Cart.scss";
import CartBottom from "./cart-bottom/CartBottom";
import { kFormatter } from "../../utils";

import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  deleteItem,
  incrementQuantity,
  resetCart,
} from "../../redux/slices/productSlices";
import { useAddBasketMutation } from "../../redux/services/basketServices";

const CartPage = () => {
  const products = useSelector((state) => state.product.products);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const token = useSelector((state) => state.auth.token);
  console.log(token);
  const [addBasket] = useAddBasketMutation();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalAdditionalPrice, setTotalAdditionalPrice] = useState(0);
  const [checkedItems, setCheckedItems] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  console.log(isAuth);
  useEffect(() => {
    if (products) {
      setCheckedItems(products.map(() => true));
    }
  }, []);

  useEffect(() => {
    let totalPrice = 0;
    let totalAdditionalPrice = 0;

    if (products) {
      products.forEach((item, index) => {
        if (checkedItems[index]) {
          totalPrice += item.price * item.quantity;
          totalAdditionalPrice += item.price;
        }
      });

      setTotalPrice(totalPrice.toFixed(2));
      setTotalAdditionalPrice(totalAdditionalPrice);
    }
  }, [products, checkedItems]);

  const handleCheckboxChange = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  const handleChangeAll = (e) => {
    const isChecked = e.target.checked;
    const newCheckedItems = Array(products?.length).fill(isChecked);
    setCheckedItems(newCheckedItems);
  };

  const goToCheckout = async () => {
    if (!isAuth) {
      toast({
        title: "Please log in to proceed to checkout.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const basketItems = products.map((item, index) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));
    try {
      const res = await addBasket(basketItems);
      console.log(res);
      navigate("/checkout");
    } catch (err) {
      console.log(err);
    }
  };

  const checkedProductsCount = products.reduce((count, item, index) => {
    return checkedItems[index] ? count + 1 : count;
  }, 0);

  return (
    <Box className="cart-page" fontFamily={theme.fonts.fInter}>
      <Container maxW={"1200px"}>
        {products?.length > 0 ? (
          <h2 className="cart-title">Корзина</h2>
        ) : (
          <div className="cart-empty_link">
            <Link to={"/"}>
              <CartArrowLeftIcon />
            </Link>
            <div className="cart-empty_right">
              <p>Главная / </p>
              <h2>Корзина</h2>
            </div>
          </div>
        )}
        {products?.length > 0 ? (
          <>
            <Grid templateColumns="repeat(12,1fr)" gap={"24px"}>
              <GridItem colSpan={8}>
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
                          checkedItems.some(Boolean) &&
                          !checkedItems.every(Boolean)
                        }
                        onChange={handleChangeAll}
                      />

                      <p className="card-top_text">
                        Всего: {checkedProductsCount} товара
                      </p>
                    </Box>
                    <Box onClick={() => dispatch(resetCart())}>
                      <button className="cart-button_text">
                        <CartEmptyIcon />
                        <span>Очистить корзину</span>
                      </button>
                    </Box>
                  </Box>

                  {products.map((item, index) => (
                    <Box key={item.id} className="cart-left_main">
                      <Box display={"flex"} justifyContent={"space-between"}>
                        <Box display={"flex"} gap={"16px"}>
                          <Box display={"flex"} alignItems={"center"}>
                            <Checkbox
                              isChecked={checkedItems[index]}
                              onChange={() => handleCheckboxChange(index)}
                            />
                          </Box>
                          <img
                            src={item.main_image}
                            alt={item.name_ru}
                            className="cart-left_img"
                          />
                          <Box
                            display={"flex"}
                            flexDirection={"column"}
                            justifyContent={"space-between"}
                          >
                            <h2 className="cart-product_name">
                              {item.name_ru}
                            </h2>
                            <Box display={"flex"} gap={"12px"}>
                              <button className="cart-button_text">
                                <CartFavouritIcon className="cart-button_icon" />
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
                          <Box
                            display={"flex"}
                            gap={"12px"}
                            alignItems={"center"}
                          >
                            <button
                              onClick={() =>
                                dispatch(decrementQuantity(item.id))
                              }
                              className="cart-product_btn"
                            >
                              -
                            </button>
                            <p className="cart-product_quantity">
                              {item.quantity}
                            </p>
                            <button
                              onClick={() =>
                                dispatch(incrementQuantity(item.id))
                              }
                              className="cart-product_btn"
                            >
                              +
                            </button>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </GridItem>
              <GridItem colSpan={4}>
                <Box className="cart-right">
                  <Box className="cart-right_top" display={"flex"} gap={"16px"}>
                    <CartSucessIcon />
                    <Box className="cart-right_text">
                      <h3>Бесплатно доставим ваш заказ</h3>
                      <p>в фирменный пункт выдачи</p>
                      <span>
                        Ещё 488 000 сум для бесплатной доставки до двери
                      </span>
                    </Box>
                  </Box>
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
                      <button
                        onClick={goToCheckout}
                        className={`cart-right_btn ${
                          checkedItems.includes(true) ? "" : "disabled"
                        }`}
                        disabled={!checkedItems.includes(true)}
                      >
                        Перейти к оформлению
                      </button>
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
          <motion.div
            className="cart-empty"
            initial={{ y: 70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div>
              <img src={emptyCart} alt="emptyCart" />
            </div>
            <Text fontFamily={theme.fonts.fSf} className="empty-cart_text">
              В корзине ничего нет
            </Text>
          </motion.div>
        )}
      </Container>
    </Box>
  );
};

export default CartPage;
