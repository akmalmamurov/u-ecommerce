import { NavLink } from "react-router-dom";
import { Box, Container } from "@chakra-ui/react";
import theme from "../../theme";
import { useGetCategoriesQuery } from "../../redux/services/categoryServices";
import Loading from "../loading/Loading";
import "./Navbar.scss";
const Navbar = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();

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
              <NavLink className="navbar-link" to={"/categories"}>
                <Box display={"flex"} gap={"1px"}>
                  Все категории
                </Box>
              </NavLink>
            )}
          </Box>
        )}
      </Container>
    </nav>
  );
};

export default Navbar;
