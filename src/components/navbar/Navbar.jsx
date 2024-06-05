import { NavLink } from "react-router-dom";
import { Box, Container } from "@chakra-ui/react";
import theme from "../../theme";
import { useGetCategoriesQuery } from "../../redux/services/categoryServices";
import "./Navbar.scss";
import NavbarLoader from "../loader/NavbarLoader";
const Navbar = () => {
  const { data, isLoading } = useGetCategoriesQuery({ limit: 8 });
  const { data: categories } = data || {};
  return (
    <nav>
      <Container maxW={"1200px"}>
        {isLoading ? (
          <NavbarLoader />
        ) : (
          <Box className="nav-list" fontFamily={theme.fonts.fInter}>
            {categories.map((category) => (
              <NavLink
                key={category.id}
                to={`/category/${category.name_ru}/${category.id}`}
                className="navbar-link"
              >
                {category.name_ru}
              </NavLink>
            ))}

            <NavLink className="navbar-link" to={"/categories"}>
              <Box display={"flex"} gap={"1px"}>
                Все категории
              </Box>
            </NavLink>
          </Box>
        )}
      </Container>
    </nav>
  );
};

export default Navbar;
