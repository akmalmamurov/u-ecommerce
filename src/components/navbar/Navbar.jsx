import { NavLink } from "react-router-dom";
import { Box, Container } from "@chakra-ui/react";
import theme from "../../theme";
import { useGetCategoriesQuery } from "../../redux/services/categoryServices";
import "./Navbar.scss";
import Loading from "../loading/Loading";

const Navbar = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();

  return (
    <nav>
      <Container maxW={"1200px"}>
        {isLoading ? (
          <Loading />
        ) : (
          <Box className="nav-list" fontFamily={theme.fonts.fInter}>
            {categories.map((category) => {
              return (
                <NavLink
                  key={category.id}
                  to={`/category/${category.name_ru}/${category.id}`}
                  className="navbar-link"
                >
                  {category.name_ru}
                </NavLink>
              );
            })}
          </Box>
        )}
      </Container>
    </nav>
  );
};

export default Navbar;
