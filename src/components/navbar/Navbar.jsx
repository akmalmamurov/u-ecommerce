import { NavLink } from "react-router-dom";
import {  useSelector } from "react-redux";
import {
  Box,
  Container,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import theme from "../../theme";
import { useGetCategoriesQuery } from "../../redux/services/categoryServices";
import Loading from "../loading/Loading";
import { ArrowBottomIcon } from "../../assets/icons";
import "./Navbar.scss";
import { CatalogMenu } from "../catalog-menu";
const Navbar = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const menuOpen = useSelector((state) => state.menu.menuOpen);
  // const dispatch = useDispatch();

  return (
    <nav>
      <Container maxW={"1200px"}>
        {isLoading ? (
          <Loading />
        ) : (
          <Box className="nav-list" fontFamily={theme.fonts.fInter}>
            {categories.slice(0, 8).map((category) => (
              <NavLink
                key={category.id}
                to={`/category/${category.name_ru}/${category.id}`}
                className="navbar-link"
              >
                {category.name_ru}
              </NavLink>
            ))}
            {categories.length > 9 && (
              <Menu className="navbar-menu">
                <MenuButton
                  className="navbar-link"
                  // onClick={() => dispatch(toggleMenu())}
                >
                  <Box display={"flex"} gap={"1px"}>
                    Ещё
                    <ArrowBottomIcon />
                  </Box>
                </MenuButton>
                <MenuList>{menuOpen && <CatalogMenu />}</MenuList>
              </Menu>
            )}
          </Box>
        )}
      </Container>
    </nav>
  );
};

export default Navbar;
