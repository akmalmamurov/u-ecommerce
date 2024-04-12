// Assuming this is your Navbar component

import { Box, Container } from "@chakra-ui/react";
import {  NavLink } from "react-router-dom";

// import { useDispatch, useSelector } from "react-redux";
// import request from "../../server";
// import { useEffect } from "react";
// import { setCategories } from "../../redux/slices/navbarSlice";
import "./Navbar.scss";
import { cashImg, saleImg } from "../../assets/images";
import theme from "../../theme";
import { ArrowBottomIcon } from "../../assets/icons";
const Navbar = () => {
  // const dispatch = useDispatch();
  // const { categories } = useSelector((state) => state.navbar);

  // const getCategories = async () => {
  //   try {
  //     const {data} = await request.get("/api/category");
  //     dispatch(setCategories(data));
  //     console.log(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   getCategories();
  // }, [dispatch]);

  return (
    <nav>
      <Container maxW={"1200px"}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          fontFamily={theme.fonts.fSF}
        >
          <NavLink className="nav-list">
            <img src={saleImg} alt="" />
            <span className="nav-link">Расродажа</span>
          </NavLink>
          <NavLink className="nav-list">
            <img src={cashImg} alt="" />
            <span className="nav-link">Кэшбек</span>
          </NavLink>
          <NavLink className="nav-list">
            <span className="nav-link">Бытовая техника</span>
          </NavLink>
          <NavLink className="nav-list">
            <span className="nav-link">Электроника</span>
          </NavLink>
          <NavLink className="nav-list">
            <span className="nav-link">Авто запчасти</span>
          </NavLink>
          <NavLink className="nav-list">
            <span className="nav-link">Еда</span>
          </NavLink>
          <NavLink className="nav-list">
            <span className="nav-link">Спорт</span>
          </NavLink>
          <NavLink className="nav-list">
            <span className="nav-link">Игрушки</span>
          </NavLink>
          <NavLink className="nav-list">
            
            <span className="nav-link">Еда</span>
            <ArrowBottomIcon/>
          </NavLink>
      
        </Box>
      </Container>
    </nav>
  );
};

export default Navbar;
