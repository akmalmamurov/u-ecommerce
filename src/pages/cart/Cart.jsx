import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Center,
  Checkbox,
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { calculateTotalPrice, kFormatter } from "utils";
import { useModal } from "hooks/useModal";
import {
  CartDeleteIcon,
  CartEmptyIcon,
  CartFavouriteIcon,
  ProductFavouritActiveIcon,
} from "assets/icons";
import CartBottom from "./cart-bottom/CartBottom";
import {
  decrementQuantity,
  deleteItem,
  incrementQuantity,
  resetCart,
} from "../../redux/slices/productSlices";
import {
  useAddBasketMutation,
  useAllDeleteBasketMutation,
  useDeleteBasketMutation,
} from "../../redux/services/basketServices";
import { toggleFavourit } from "../../redux/slices/favouritSlices";
import LoginModal from "components/modal/login/LoginModal";
import CartModal from "./cart-modal/CartModal";
import EmptyCart from "./empty-cart/EmptyCart";
import theme from "theme";
import "./Cart.scss";

const CartPage = () => {
  const products = useSelector((state) => state.product.products);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const favourites = useSelector((state) => state.favourit.favourites);
  const [addBasket] = useAddBasketMutation();
  const [deleteBasket] = useDeleteBasketMutation();
  const [allDeleteBasket] = useAllDeleteBasketMutation();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalAdditionalPrice, setTotalAdditionalPrice] = useState(0);
  const [checkedItems, setCheckedItems] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  const handleCheckboxChange = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  const handleFavoriteToggle = (item) => {
    dispatch(toggleFavourit(item));
  };

  const handleChangeAll = (e) => {
    const isChecked = e.target.checked;
    const newCheckedItems = Array(products?.length).fill(isChecked);
    setCheckedItems(newCheckedItems);
  };

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
      // First, clear the basket
      await allDeleteBasket().unwrap();
  
      // Add selected products to the basket
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
          description: "One or more items exceed the available stock. Please adjust the quantities.",
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
  
  const allProductDelete = () => {
    if (products.length === 0) return;

    products.forEach((item) => {
      deleteBasket({ product_id: item.id });
      dispatch(deleteItem(item.id));
    });
    dispatch(resetCart());
  };

  const checkedProductsCount = products.reduce((count, item, index) => {
    return checkedItems[index] ? count + 1 : count;
  }, 0);

  return (
    <Box className="cart-page" fontFamily={theme.fonts.fInter}>
      <Container maxW={"1200px"}>
        {products?.length > 0 ? (
          <>
            <Grid templateColumns="repeat(12,1fr)" gap={"24px"}>
              <GridItem colSpan={7}>
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

                      <Text
                        className="card-top_text"
                        color={theme.colors.deepBlack}
                      >
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
                  {products.map((item, index) => (
                    <Box key={item.id} className="cart-left_main">
                      <Box display={"flex"} justifyContent={"space-between"}>
                        <Box
                          display={"flex"}
                          gap={"16px"}
                          alignItems={"center"}
                        >
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
                            gap={"20px"}
                          >
                            <Heading
                              onClick={() => navigate(`/products/${item.id}`)}
                              as={"h2"}
                              className="cart-product_name"
                              cursor={"pointer"}
                              fontFamily={theme.fonts.fInter}
                              color={theme.colors.deepBlack}
                            >
                              {item.name_ru}
                            </Heading>
                            <Box display={"flex"} gap={"12px"}>
                              <button
                                className={`cart-button_text`}
                                onClick={() => {
                                  handleFavoriteToggle(item);
                                }}
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
                            {" "}
                            {kFormatter(item.price * item.quantity)}{" "}
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
                              disabled={item.quantity === 1}
                            >
                              -
                            </button>
                            <p className="cart-product_quantity">
                              {" "}
                              {item.quantity}{" "}
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
          <EmptyCart />
        )}
      </Container>
      <LoginModal isOpen={isLoginOpen} onClose={closeLogin} />
    </Box>
  );
};

export default CartPage;
