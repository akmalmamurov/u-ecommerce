import { useState } from "react";
import { Box, Menu, MenuButton, MenuList, Text } from "@chakra-ui/react";
import { MenuCloseIcon, RightArrowIcon } from "../../assets/icons";
import "./CatalogMenu.scss";
import { useGetCategoriesQuery } from "../../redux/services/categoryServices";
import theme from "../../theme";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";
import { menuImg } from "../../assets/images";

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

  const addToCategory = (name, id) => {
    setMenuOpen(false);
    navigate(`/category/${encodeURIComponent(name)}/${id}`);
  };

  return (
    <div className="catalog-menu">
      <Menu className="catalog-menu_pos" onClose={handleCloseMenu}>
        <MenuButton
          height={"40px"}
          py={"12px"}
          px={"16px"}
          bg={theme.colors.lightBlue}
          className="catalog_menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Box display={"flex"} alignItems={"center"} gap={"16px"}>
            {menuOpen ? (
              <MenuCloseIcon />
            ) : (
              <>
                <img src={menuImg} alt="" />
              </>
            )}
            <Text
              fontSize={"14px"}
              color={theme.colors.skyBlue}
              fontFamily={theme.fonts.fInter}
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
                        <Link to="#" className="catalog-menu_item">
                          <img src={el.icon_id} alt="" className="" />
                          <Text className="catalog-menu_link">
                            {el.name_ru}
                          </Text>
                        </Link>
                        <RightArrowIcon />
                      </Box>
                    ))}
                  </Box>
                  <Box className="catalog-menu_right">
                    {data.map((el) => (
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
                                onClick={() =>
                                  addToCategory(subcat.name_ru, subcat.id)
                                }
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
