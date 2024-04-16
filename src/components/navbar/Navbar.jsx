import { NavLink } from "react-router-dom";
import { Box, Container } from "@chakra-ui/react";
import theme from "../../theme";
import { useGetCategoriesQuery } from "../../redux/services/categoryServices";
// import "./Navbar.scss"

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
              const russianTranslation = category.translations.find(
                (trans) => trans.language_code === "ru"
              );
              if (!russianTranslation) return null;
              return (
                <NavLink
                  key={category.id}
                  className="nav-list"
                  to={`/${russianTranslation.name}`}
                >
                  <img
                    src={category.image}
                    alt={russianTranslation.name}
                    className="navbar-img"
                  />
                  <span className="nav-link">{russianTranslation.name}</span>
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
