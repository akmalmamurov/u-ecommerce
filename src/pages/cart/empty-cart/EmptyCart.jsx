import { Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { emptyCart } from "../../../assets/images";
import theme from "../../../theme";
import "./EmptyCart.scss";
const EmptyCart = () => {
  return (
    <div className="empty-cart_content">
      <motion.div
        className="cart-empty"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div>
          <img src={emptyCart} alt="emptyCart" />
        </div>
        <Text fontFamily={theme.fonts.fSf} className="empty-cart_text">
          В корзине ничего нет
        </Text>
        <Box fontFamily={theme.fonts.fInter} mt={"32px"}>
          <Link to="/" className="empty-cart_btn">
            Вернуться на главную страницу
          </Link>
        </Box>
      </motion.div>
    </div>
  );
};

export default EmptyCart;
