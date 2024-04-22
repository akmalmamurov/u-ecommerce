import { NavLink } from "react-router-dom";
import { Box, Container } from "@chakra-ui/react";
import theme from "../../theme";
import { useGetCategoriesQuery } from "../../redux/services/categoryServices";
import "./Navbar.scss";

const Navbar = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();

  return (
    <nav>
      <Container maxW={"1200px"}>
        {isLoading ? (
          "...Loading"
        ) : (
          <Box display={"flex"} gap={"38.8px"} fontFamily={theme.fonts.fSF}>
            {categories.map((category) => {
              return (
                <NavLink
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="nav-list navbar-link"
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
