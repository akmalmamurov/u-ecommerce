import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import {
  Box,
  Container,
  Divider,
  Grid,
  GridItem,
  useToast,
} from "@chakra-ui/react";
import { NoRatingIcon, YesRatingIcon } from "../../assets/icons";
import { useGetProductByIdQuery } from "../../redux/services/productAllServices";
import theme from "../../theme";
import "./ProductDetails.scss";
import { buyImg, cartWhite, heartWhite } from "../../assets/images";
import { addToCart } from "../../redux/slices/productSlices";
import { useDispatch } from "react-redux";
import { toggleFavourit } from "../../redux/slices/favouritSlices";

const ProductsDetails = () => {
  const { id } = useParams();
  const { data } = useGetProductByIdQuery(id);
  const [mainImage, setMainImage] = useState(null);
  const [rating, setRating] = useState(3);
  const toast = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data && data.image_files.length > 0) {
      setMainImage(data.image_files.media_file);
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
  const handleAddToCart = () => {
    dispatch(
      addToCart(
        {
          id: data.id,
          main_image: data.main_image,
          price: data.price,
          description_ru: data.description_ru,
          name_ru: data.name_ru,
          quantity: 1,
        },
        toast({
          title: "Добавлено в корзину",
          description: `${data.name_ru}`,
          status: "success",
          duration: 2000,
          isClosable: true,
        })
      )
    );
  };
  const handleAddToFavourit = () => {
    dispatch(
      toggleFavourit(
        {
          id: data.id,
          main_image: data.main_image,
          price: data.price,
          description_ru: data.description_ru,
          name_ru: data.name_ru,
          quantity: 1,
        },
        toast({
          title: "Добавлено в Избранное",
          description: `${data.name_ru}`,
          status: "success",
          duration: 2000,
          isClosable: true,
        })
      )
    );
  };
  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  return (
    <Box className="product-details" fontFamily={theme.fonts.fInter}>
      <Container maxW={"1200px"}>
        {data && (
          <Fragment>
            <Grid templateColumns={"repeat(2,1fr)"} gap={"80px"}>
              <GridItem>
                <Box className="product-details_left">
                  <div className="product-img_left">
                    <img
                      src={data.main_image}
                      alt=""
                      onClick={() =>
                        handleThumbnailClick({ media_file: data.main_image })
                      }
                    />
                    {data.image_files &&
                      data.image_files.map((image) => (
                        <img
                          key={image.id}
                          src={image.media_file}
                          alt=""
                          className=""
                          onClick={() => handleThumbnailClick(image)}
                        />
                      ))}
                  </div>
                  <Box className="product-img_right">
                    <img
                      id="mainImage"
                      src={mainImage ? mainImage : data.main_image}
                      alt={data.name_ru}
                    />
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
                  <p className="pr-details_price">{data.price} сум</p>
                  <Divider border={"1px solid #98999A"} />
                  <Box
                    display={"flex"}
                    my={"32px"}
                    alignItems={"center"}
                    gap={"22px"}
                  >
                    <Box className="pr-details_quantity">
                      <button className="pr-details_quantity-btn">-</button>
                      <p>{data.quantity}</p>
                      <button className="pr-details_quantity-btn">+</button>
                    </Box>
                    <p>шт.</p>
                  </Box>
                  <Divider
                    w={"183px"}
                    border={"1px solid #98999A"}
                    mb={"32px"}
                  />
                  <Box display={"flex"} gap={"39px"}>
                    <button
                      onClick={handleAddToCart}
                      className="pr-details_btn"
                    >
                      <img src={cartWhite} alt="cart" />
                      <span>В корзину</span>
                    </button>
                    <button
                      onClick={handleAddToFavourit}
                      className="pr-details_btn"
                    >
                      <img src={heartWhite} alt="cart" />
                      <span>Избранное</span>
                    </button>
                  </Box>
                  <Box mt={"14px"}>
                    <button className="pr-details_buy-btn">
                      <img src={buyImg} alt="buy" />
                      <span>Купить сейчас</span>
                    </button>
                  </Box>
                </Box>
              </GridItem>
            </Grid>
            <Box py={"24px"} className="pr-details_bottom">
              <h2 className="pr-details_bottom-title">Описание товара</h2>
              <Box>
                <Box className="pr-details_bottom-img">
                  <img src={data.main_image} alt="" />
                </Box>
                <p className="pr-details_bottom-text"> {data.description_ru}</p>
              </Box>
            </Box>
          </Fragment>
        )}
      </Container>
    </Box>
  );
};

export default ProductsDetails;
