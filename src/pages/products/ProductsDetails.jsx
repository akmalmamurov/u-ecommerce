import { useEffect, Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { Box, Button, Container, Divider, Grid, GridItem, Text, useToast, } from "@chakra-ui/react";

import { addToCart } from "../../redux/slices/productSlices";
import { toggleFavourit } from "../../redux/slices/favouritSlices";
import { useGetProductByIdQuery } from "../../redux/services/productAllServices";
import { useAddBasketMutation, useAllDeleteBasketMutation, } from "../../redux/services/basketServices";
import { NoRatingIcon, PrDetailsSucessIcon, PrDetailsNoSucessIcon, YesRatingIcon } from "assets/icons";
import ProductsDetailsLoader from "components/loader/product-details-loader/ProductDetailsLoader";
import ProductModal from "components/modal/product-modal/ProductModal";
import { buyImg, heartActiveImg, heartBlackImg } from "assets/images";
import LoginModal from "components/modal/login/LoginModal";
import { useModal } from "hooks/useModal";
import { kFormatter } from "utils";
import theme from "theme";
import "./ProductDetails.scss";

const ProductsDetails = () => {
  const { id } = useParams();
  const { data, isLoading: productLoading } = useGetProductByIdQuery(id);
  const [allDeleteBasket] = useAllDeleteBasketMutation();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const cart = useSelector((state) => state.product.products);
  const favourites = useSelector((state) => state.favourit.favourites);
  const [addBasket, { isLoading }] = useAddBasketMutation();
  const [mainImage, setMainImage] = useState(null);
  const [rating, setRating] = useState(0);
  const [qty, setQty] = useState(1);
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAddedToFavourites = favourites.some((item) => item.id === id);
  const { isOpen, open, close } = useModal();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isAddedToCart = cart.some((item) => item.id === id);
  useEffect(() => {
    if (data && data.image_files && data.image_files.length > 0) {
      setMainImage(data.image_files[0].media_file);
    }
    if (data && data.rating) {
      setRating(data.rating);
    }
  }, [data]);

  const handleThumbnailClick = (image) => {
    setMainImage(image.media_file);
    const mainImageElement = document.getElementById("mainImage");
    if (mainImageElement) {
      mainImageElement.src = image.media_file;
    }
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };
  const addToCartSucess = () => {
    navigate("/cart");
  };


  const handleAddToCart = () => {
    if (data) {
      dispatch(
        addToCart({
          id: data.id,
          main_image: data.main_image,
          price: data.price,
          description_ru: data.description_ru,
          name_ru: data.name_ru,
          quantity: qty,
        })
      );
      toast({
        title: "Добавлено в корзину",
        description: `${data.name_ru}`,
        status: "info",
        position: "top-right",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleAddToFavourit = () => {
    if (data) {
      dispatch(
        toggleFavourit({
          id: data.id,
          main_image: data.main_image,
          price: data.price,
          description_ru: data.description_ru,
          name_ru: data.name_ru,
          quantity: qty,
        })
      );
    }
  };

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const incrementQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decrementQty = () => {
    if (qty > 1) {
      setQty((prevQty) => prevQty - 1);
    }
  };
  const productToCheckout = async () => {
    if (!isAuth) {
      open();
      return;
    }

    try {
      await allDeleteBasket().unwrap();
      await addBasket({ product_id: id, quantity: qty }).unwrap();
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
          description: "Failed to add item to basket. Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };
  return (
    <Box className="product-details" fontFamily={theme.fonts.fInter}>
      <Container maxW={"1200px"}>
        {productLoading ? (
          <ProductsDetailsLoader />
        ) : (
          data && (
            <Fragment>
              <Grid templateColumns={"repeat(2,1fr)"} gap={"80px"}>
                <GridItem>
                  <Box className="product-details_left">
                    <div className="product-img_left">
                      <img
                        src={data?.main_image}
                        alt={data?.name_ru}
                        className="product-details_img-sm"
                        onClick={() =>
                          handleThumbnailClick({ media_file: data.main_image })
                        }
                      />
                      {data.image_files &&
                        data.image_files.map((image) => (
                          <img
                            key={image.id}
                            src={image.media_file}
                            alt={data.name_ru}
                            className="product-details_img-sm"
                            onClick={() => handleThumbnailClick(image)}
                          />
                        ))}
                    </div>
                    <Box className="product-img_right">
                      {mainImage && (
                        <img
                          onClick={handleImageClick}
                          id="mainImage"
                          className="product-details_img-lg"
                          src={data.main_image}
                          alt={data.name_ru}
                        />
                      )}
                    </Box>
                  </Box>
                </GridItem>
                <GridItem>
                  <Box className="product-details_right">
                    <h1 className="pr-details_title">{data.name_ru}</h1>
                    <div className="pr-details_rating">
                      <ReactStars
                        count={5}
                        value={rating}
                        onChange={ratingChanged}
                        size={24}
                        isHalf={true}
                        emptyIcon={<NoRatingIcon />}
                        halfIcon={<YesRatingIcon />}
                        activeColor="#ffd700"
                      />
                      <p className="pr-details_rating-text">{rating}</p>
                    </div>
                    <p className="pr-details_price">
                      {kFormatter(data.price * qty)}{" "}
                    </p>
                    <Divider border={"1px solid #98999A"} w={"100%"} />
                    <Box
                      display={"flex"}
                      my={"32px"}
                      alignItems={"center"}
                      gap={"12px"}
                    >
                      <Box className="pr-details_quantity">
                        <Button
                          className="pr-details_quantity-btn"
                          onClick={decrementQty}
                          color={theme.colors.manhatanMist}
                          isDisabled={qty === 1}
                        >
                          -
                        </Button>
                        <p>{qty}</p>
                        <Button
                          className="pr-details_quantity-btn"
                          onClick={incrementQty}
                          color={theme.colors.manhatanMist}
                        >
                          +
                        </Button>
                      </Box>
                      <Text color={theme.colors.codexGrey}>шт.</Text>
                      <Text color={theme.colors.boilingAcid}>
                        В наличии {data.quantity}
                      </Text>
                    </Box>
                    <Divider
                      w={"100%"}
                      border={"1px solid #98999A"}
                      mb={"32px"}
                    />
                    <Box display={"flex"} gap={"16px"}>
                      {isAddedToCart ? (
                        <button
                          className="pr-details_btn"
                          onClick={addToCartSucess}
                        >
                          <PrDetailsSucessIcon />

                          <span>В корзине</span>
                        </button>
                      ) : (
                        <button
                          className="pr-details_btn"
                          onClick={handleAddToCart}
                        >
                          <PrDetailsNoSucessIcon />

                          <span>В корзина</span>
                        </button>
                      )}

                      <button
                        onClick={handleAddToFavourit}
                        className="pr-details_btn favourites-btn"
                      >
                        {isAddedToFavourites ? (
                          <img
                            src={heartActiveImg}
                            alt="cart"
                            className="favourites-img"
                          />
                        ) : (
                          <img
                            src={heartBlackImg}
                            alt="cart"
                            className="favourites-img"
                          />
                        )}
                        <span>Избранное</span>
                      </button>
                    </Box>
                    <Box mt={"24px"}>
                      <Button
                        isLoading={isLoading}
                        onClick={productToCheckout}
                        className="pr-details_buy-btn"
                      >
                        <img src={buyImg} alt="buy" />
                        <span>Купить сейчас</span>
                      </Button>
                    </Box>
                  </Box>
                </GridItem>
              </Grid>
              <Box pt={"24px"} className="pr-details_bottom">
                <h2 className="pr-details_bottom-title">Описание товара</h2>
                <Box>
                  <Box className="pr-details_bottom-img">
                    <img src={data.main_image} alt="" />
                  </Box>
                  <p className="pr-details_bottom-text">
                    {" "}
                    {data.description_ru}
                  </p>
                </Box>
              </Box>
            </Fragment>
          )
        )}
      </Container>
      <LoginModal isOpen={isOpen} onClose={close} />
      <ProductModal
        data={data}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </Box>
  );
};

export default ProductsDetails;
