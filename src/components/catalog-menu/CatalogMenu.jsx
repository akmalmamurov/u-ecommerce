import { useState } from "react";
import { Box, Menu, MenuButton, MenuList, Text } from "@chakra-ui/react";
import {
  CartDeleteIcon,
  DropdownIcon,
  RightArrowIcon,
} from "../../assets/icons";
import "./CatalogMenu.scss";
import { useGetCategoriesQuery } from "../../redux/services/categoryServices";
import theme from "../../theme";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";

const CatalogMenu = () => {
  const { data, isLoading } = useGetCategoriesQuery();
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = (id) => {
    setHoveredCategoryId(id);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  const addToCategory = (id) => {
    setMenuOpen(false);
    navigate(`/category/${id}`);
  };

  return (
    <div className="catalog-menu">
      <Menu className="catalog-menu_pos" onClose={handleCloseMenu}>
        <MenuButton
          h={"48px"}
          py={"12px"}
          px={"16px"}
          bg={theme.colors.lightBlue}
          className="catalog_menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Box display={"flex"} gap={"16px"}>
            {menuOpen ? <CartDeleteIcon /> : <DropdownIcon />}
            <Text
              fontSize={"18px"}
              color={"#9C9C9C"}
              fontFamily={theme.fonts.fSf}
            >
              Каталог
            </Text>
          </Box>
        </MenuButton>
        {menuOpen && (
          <MenuList className="catalog-menu_list-wrapper">
            {isLoading ? (
              <Loading />
            ) : (
              data &&
              data.length > 0 && (
                <>
                  <Box className="catalog-menu_sidebar">
                    {data.map((el) => (
                      <Box
                        key={el.id}
                        className="catalog-menu_content"
                        onMouseEnter={() => handleMouseEnter(el.id)}
                      >
                        <Box
                          className="catalog-menu_item"
                          cursor={"pointer"}
                          onClick={() => addToCategory(el.id)}
                        >
                          <img src={el.image} alt="" className="" />
                          <Text className="catalog-menu_link">
                            {el.name_ru}
                          </Text>
                        </Box>
                        <RightArrowIcon />
                      </Box>
                    ))}
                  </Box>
                  <Box className="catalog-menu_right">
                    {data &&
                      data.map((el) => (
                        <Box
                          key={el.id}
                          className="sub-categories"
                          style={{
                            display:
                              hoveredCategoryId === el.id ? "block" : "none",
                          }}
                        >
                          <h1 className="subcategory-title">{el.name_ru}</h1>
                          {el.subcategories &&
                            el.subcategories.map((subcat) => (
                              <Box key={subcat.id} mb={"12px"}>
                                <Box
                                  cursor={"pointer"}
                                  onClick={() => addToCategory(subcat.id)}
                                  className="sub-category"
                                >
                                  {subcat.name_ru}
                                </Box>
                              </Box>
                            ))}
                        </Box>
                      ))}
                  </Box>
                </>
              )
            )}
          </MenuList>
        )}
      </Menu>
    </div>
  );
};

export default CatalogMenu;
