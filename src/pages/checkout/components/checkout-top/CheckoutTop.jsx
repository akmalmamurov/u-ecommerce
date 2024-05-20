import { Box, Text } from "@chakra-ui/react";
import "./CheckoutTop.scss";
import theme from "../../../../theme";
import {
  CheckoutLeftArrowIcon,
  CheckoutUserIcon,
} from "../../../../assets/icons";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../../../../assets/images";
const CheckoutTop = () => {
  const navigate = useNavigate();
  const enterOrder = ()=>{
    navigate("/profile");
  }
  return (
    <Box
      className="checkout-top"
      bg={theme.colors.white}
      fontFamily={theme.fonts.fInter}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Link to={"/cart"} className="checkout-top_link">
          <CheckoutLeftArrowIcon />
          <Text>Назад</Text>
        </Link>
        <Link to={"/"} style={{ width: "40px", height: "40px" }}>
          <img src={logo} alt="" />
        </Link>

        <button className="checkout-top_btn" onClick={enterOrder}>
          <CheckoutUserIcon />
          <Text color={theme.colors.ninja}>Личный кабинет</Text>
        </button>
      </Box>
    </Box>
  );
};

export default CheckoutTop;
