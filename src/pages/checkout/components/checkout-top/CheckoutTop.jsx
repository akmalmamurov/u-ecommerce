/* eslint-disable no-unused-vars */
import { Box, Text } from "@chakra-ui/react";
import {  useNavigate, useLocation } from "react-router-dom";

import theme from "theme";
import { CheckoutLeftArrowIcon, CheckoutUserIcon, } from "assets/icons";
 import "./CheckoutTop.scss";

const CheckoutTop = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const enterOrder = () => {
    navigate("/profile");
  };

  const handleBackNavigation = () => {
    const currentPath = location.pathname;
      navigate(-1);
  };

  return (
    <Box className="checkout-top" bg={theme.colors.white} fontFamily={theme.fonts.fInter}>
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
        <button onClick={handleBackNavigation} className="checkout-top_link">
          <CheckoutLeftArrowIcon />
          <Text>Назад</Text>
        </button>

        <button className="checkout-top_btn" onClick={enterOrder}>
          <CheckoutUserIcon />
          <Text color={theme.colors.ninja}>Личный кабинет</Text>
        </button>
      </Box>
    </Box>
  );
};

export default CheckoutTop;
