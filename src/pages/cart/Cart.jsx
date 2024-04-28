import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  Box,
  Center,
  Container,
  Divider,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import {
  CartArrowLeftIcon,
  CartDeleteIcon,
  CartEmptyIcon,
  CartFavouritIcon,
  CartSucessIcon,
} from "../../assets/icons";
import {
  decrementQuantity,
  deleteItem,
  incrementQuantity,
  resetCart,
} from "../../redux/slices/productSlices";
import theme from "../../theme";
import { emptyCart } from "../../assets/images";
import "./Cart.scss";
import CartBottom from "./cart-bottom/CartBottom";
import { kFormatter } from "../../utils";

const CartPage = () => {
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState("");
  const [totalAdditionalPrice, setTotalAdditionalPrice] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [checked, setChekced] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let Total = 0;
    let additionalPrice = 0;
    products.forEach((item) => {
      Total += item.price * item.quantity;
      additionalPrice += item.price;
    });
    setTotalPrice(Total.toFixed(2));
    setTotalAdditionalPrice(additionalPrice);
  }, [products]);

  const handleAllCheck = (e) => {
    const isSelected = e.target.checked;
    const value = e.target.value;
    setSelectedItems((prevData) =>
      isSelected ? [...prevData, value] : prevData.filter((id) => id !== value)
    );
  };

  const checkAllHandler = () => {
    if (products.length === selectedItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(products.map((item) => item.id));
    }
  };

  const goToCheckout = () => {
    selectedItems.length > 0 &&
      navigate("/checkout", {
        state: {
          products: products.filter((item) => selectedItems.includes(item.id)),
          totalPrice: products
            .filter((item) => selectedItems.includes(item.id))
            .reduce((acc, item) => acc + item.price * item.quantity, 0),
        },
      });
  };

  return (
    <Box className="cart-page" fontFamily={theme.fonts.fInter}>
      <Container maxW={"1200px"}>
        {products.length > 0 ? (
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
        {products.length > 0 ? (
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
                      <div onClick={checkAllHandler}>
                        <input
                          type="checkbox"
                          className="cart-check_input"
                          onClick={() => setChekced(!checked)}
                        />
                      </div>
                      <p className="card-top_text">
                        Всего: {products.length} товара
                      </p>
                    </Box>
                    <Box>
                      <button
                        onClick={() => dispatch(resetCart())}
                        className="cart-button_text"
                      >
                        <CartEmptyIcon />
                        <span>Очистить корзину</span>
                      </button>
                    </Box>
                  </Box>

                  {products.map((item) => (
                    <Box key={item.id} className="cart-left_main">
                      <Box display={"flex"} justifyContent={"space-between"}>
                        <Box display={"flex"} gap={"16px"}>
                          <Box display={"flex"} alignItems={"center"}>
                            <input
                              onChange={handleAllCheck}
                              type="checkbox"
                              checked={selectedItems.includes(item.id)}
                              value={item.id}
                              className="cart-check_input"
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
                        {kFormatter(totalPrice)}{" "}
                      </p>
                    </div>
                    <div className="cart-right_item">
                      <p className="cart-right_tovar">
                        Товары, {products.length} шт
                      </p>
                      <p className="cart-right_additional">
                        {kFormatter(totalAdditionalPrice)}
                      </p>
                    </div>
                    <Box my={"16px"}>
                      <input
                        type="text"
                        className="cart-right_input"
                        placeholder="Введите промокод"
                      />
                    </Box>
                    <button
                      onClick={goToCheckout}
                      className={`cart-right_btn ${
                        !selectedItems.length ? "disabled" : ""
                      }`}
                      disabled={!selectedItems.length}
                    >
                      Перейти к оформлению
                    </button>
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
