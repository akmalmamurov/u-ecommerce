import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";
import "./CheckoutProduct.scss";
import theme from "../../../../theme";
import { kFormatter } from "../../../../utils";
import { Fragment } from "react";
const CheckoutProduct = ({ products, total_price }) => {
  return (
    <Fragment>
      <Box
        className="checkout-product"
        fontFamily={theme.fonts.fInter}
        mb={"24px"}
      >
        <h1 className="checkout-product_title">Товары в заказе</h1>
        {products &&
          products.map((product) => (
            <div key={product.id} className="checkout-product_box">
              <img
                src={product.main_image}
                alt={product.name_ru}
                className="checkout-product_image"
              />
              <div className="checkout-product_info">
                <p className="checkout-product_info-name">{product.name_ru}</p>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <p className="checkout-product_info-price">
                    {kFormatter(product.price)}{" "}
                  </p>
                  <p className="checkout-product_info-qty">
                    {product.quantity} шт
                  </p>
                </Box>
              </div>
            </div>
          ))}
      </Box>
      <div className="checkout-product_bottom">
        <h1 className="checkout-product_title">Ваш заказ</h1>
        <Box display={"flex"} justifyContent={"space-between"}>
          <p className="checkout-bottom_name">
            {" "}
            {products?.length} товара на сумму
          </p>
          <p className="checkout-bottom_total">{kFormatter(total_price)}</p>
        </Box>
      </div>
    </Fragment>
  );
};
CheckoutProduct.propTypes = {
  products: PropTypes.array,
  total_price: PropTypes.number,
};

export default CheckoutProduct;
