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
import {
  useDeleteBasketMutation,
  useGetBasketQuery,
  useUpdateBasketMutation,
} from "../../redux/services/basketServices";
import Loading from "../../components/loading/Loading";

const CartPage = () => {
  const { data } = useGetBasketQuery();
  const [deleteBasket] = useDeleteBasketMutation();
  const [updateBasket] = useUpdateBasketMutation();
  const [totalPrice, setTotalPrice] = useState(data?.total_price);
  const [totalAdditionalPrice, setTotalAdditionalPrice] = useState(0);
  const [checkedItems, setCheckedItems] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);
  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.products) {
      setCheckedItems(data.products.map(() => true));
    }
  }, [data]);

  useEffect(() => {
    let totalPrice = 0;
    let totalAdditionalPrice = 0;

    if (data?.products) {
      data.products.forEach((item, index) => {
        if (checkedItems[index]) {
          totalPrice += item.price * item.quantity;
          totalAdditionalPrice += item.price;
        }
      });
      setTotalPrice(totalPrice.toFixed(2));
      setTotalAdditionalPrice(totalAdditionalPrice);
      const selectedProducts = data.products.filter(
        (_, index) => checkedItems[index]
      );
      setTotalProducts(selectedProducts.length);
    }
  }, [checkedItems, data]);

  const handleCheckboxChange = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  const handleChangeAll = (e) => {
    const isChecked = e.target.checked;
    const newCheckedItems = Array(data?.products?.length).fill(isChecked);
    setCheckedItems(newCheckedItems);
  };

  const goToCheckout = () => {
    if (data?.products && checkedItems.length > 0) {
      navigate("/checkout", {
        state: {
          products: data.products.filter((item) =>
            checkedItems.includes(item.id)
          ),
          totalPrice: data.products
            .filter((item) => checkedItems.includes(item.id))
            .reduce((acc, item) => acc + item.price * item.quantity, 0),
        },
      });
    }
  };

  const deleteItem = async (id) => {
    const productData = {
      product_id: id,
    };
    try {
      setLoading(true);
      await deleteBasket(productData);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteAllItems = async () => {
    if (data && data.products && data.products.length > 0) {
      for (const item of data.products) {
        await deleteItem(item.id);
      }
    }
  };

  const decrementQuantity = async (id) => {
    const item = data.products.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      const updates = {
        product_id: id,
        quantity: item.quantity - 1,
      };
      await updateBasket(updates);
    }
  };

  const incrementQuantity = async (id) => {
    const item = data.products.find((item) => item.id === id);
    if (item) {
      const updates = {
        product_id: id,
        quantity: item.quantity + 1,
      };
      await updateBasket(updates);
    }
  };
  return (
    <Box className="cart-page" fontFamily={theme.fonts.fInter}>
      <Container maxW={"1200px"}>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
            }}
          >
            <Loading />
          </div>
        ) : data?.products?.length > 0 ? (
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
        {data?.products?.length > 0 ? (
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
                        isChecked={allChecked}
                        isIndeterminate={isIndeterminate}
                        onChange={handleChangeAll}
                      />

                      <p className="card-top_text">
                        Всего: {data.products.length} товара
                      </p>
                    </Box>
                    <Box onClick={() => deleteAllItems()}>
                      <button className="cart-button_text">
                        <CartEmptyIcon />
                        <span>Очистить корзину</span>
                      </button>
                    </Box>
                  </Box>

                  {data.products.map((item, index) => (
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
                                onClick={() => deleteItem(item.id)}
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
                              onClick={() => decrementQuantity(item.id)}
                              className="cart-product_btn"
                            >
                              -
                            </button>
                            <p className="cart-product_quantity">
                              {item.quantity}
                            </p>
                            <button
                              onClick={() => incrementQuantity(item.id)}
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
                        Товары, {totalProducts} шт
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
