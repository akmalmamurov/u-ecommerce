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
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            fontFamily={theme.fonts.fSF}
          >
            {categories.map((category) => {
              return (
                <NavLink
                  key={category.id}
                  className="nav-list"
                  to={`/category/${category.id}`}
                >
                  <img
                    src={category.image}
                    alt={category.name_ru}
                    className="navbar-img"
                  />
                  <span className="nav-link active">{category.name_ru}</span>
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
