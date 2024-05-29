import PropTypes from "prop-types";
import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProductModalCloseIcon, ProductRightIcon, ProductLeftIcon, } from "../../../assets/icons";
import "./ProductModal.scss";
const ProductModal = ({ isModalOpen, data, setIsModalOpen }) => {
  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <ProductRightIcon />,
    prevArrow: <ProductLeftIcon />,
    customPaging: function (i) {
      const image = i === 0 ? data?.main_image : data?.image_files[i - 1]?.media_file;
      return (
        <a> <img src={image} alt={`Thumbnail ${i}`} style={{ width: "57px", height: "100%", objectFit: "contain" }} /> </a>
      );
    },
    appendDots: (dots) => (
      <div style={{ padding: "24px" }}>
        <ul style={{ margin: "0px" }}>{dots}</ul>
      </div>
    ),
  };

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="full" >
      <ModalOverlay />
      <ModalContent className="product-modal_content">
        <ModalHeader className="product-modal_header">
          <div className="product-modal_close" onClick={() => setIsModalOpen(false)} >
            <ProductModalCloseIcon />
          </div>
        </ModalHeader>
        <ModalBody className="product-modal_body">
          <div className="slider-container">
            <Slider {...settings} className="product-modal_slider">
              <div className="slider-main_img">
                <img src={data?.main_image} alt={data?.name_ru} style={{ maxHeight: "90vh", maxWidth: "90%" }} className="slider-img_main" />
              </div>
              {data?.image_files.map((image) => (
                <div key={image.id} className="slider-img_files">
                    <img className="slider-img_file" src={image.media_file} alt={data?.name_ru} style={{ maxHeight: "90vh", maxWidth: "90%" }} />
                   </div>
              ))}
            </Slider>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

ProductModal.propTypes = {
  isModalOpen: PropTypes.bool,
  data: PropTypes.object,
  setIsModalOpen: PropTypes.func,
};
export default ProductModal;
