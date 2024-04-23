import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { Box, Container, Grid, GridItem } from "@chakra-ui/react";
import { NoRatingIcon, YesRatingIcon } from "../../assets/icons";
import { useGetProductByIdQuery } from "../../redux/services/productAllServices";
import theme from "../../theme";
import "./ProductDetails.scss";

const ProductsDetails = () => {
  const { id } = useParams();
  const { data } = useGetProductByIdQuery(id);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    if (data && data.image_files.length > 0) {
      setMainImage(data.image_files.media_file);
    }
  }, [data]);

  const handleThumbnailClick = (image) => {
    setMainImage(image.media_file);
    const mainImageElement = document.getElementById("mainImage");
    if (mainImageElement) {
      mainImageElement.src = image.media_file;
    }
  };
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  return (
    <Box className="product-details">
      <Container maxW={"1200px"}>
        {data && (
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
              <Box
                className="product-details_right"
                fontFamily={theme.fonts.fInter}
              >
                <h1 className="pr-details_title">{data.name_ru}</h1>
                <div className="pr-details_rating">
                  <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    isHalf={true}
                    emptyIcon={<NoRatingIcon/>}
                    halfIcon={<YesRatingIcon/>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                  />
                  ,{data.rating}
                </div>
              </Box>
            </GridItem>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default ProductsDetails;
