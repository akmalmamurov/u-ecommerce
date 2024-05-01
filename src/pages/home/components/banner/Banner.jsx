import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import {
  bannerImgFour,
  bannerImgOne,
  bannerImgThree,
  bannerImgTwo,
} from "../../../../assets/images";
import { Box, Container } from "@chakra-ui/react";
import "./Banner.scss";
export const Banner = () => {
  return (
    <Box className="banner">
      <Container maxW={"1200px"}>
        <Swiper
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => swiper}
          onSlideChange={() => ""}
        >
          <SwiperSlide>
            <img src={bannerImgOne} alt="bannerImg" className="banner-img" />
          </SwiperSlide>

          <SwiperSlide>
            <img src={bannerImgTwo} alt="bannerImg" className="banner-img" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={bannerImgThree} alt="bannerImg" className="banner-img" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={bannerImgFour} alt="bannerImg" className="banner-img" />
          </SwiperSlide>
        </Swiper>
      </Container>
    </Box>
  );
};

export default Banner;
