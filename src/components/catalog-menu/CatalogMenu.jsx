import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, Text } from "@chakra-ui/react";

import { useGetCategoriesQuery } from "../../redux/services/categoryServices";
import { hideMenu } from "../../redux/slices/menuSlices";
import { RightArrowIcon } from "assets/icons";
import CatalogMenuLoader from "../loader/CatalogMenuLoader";
import "./CatalogMenu.scss";

const CatalogMenu = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetCategoriesQuery({ page, limit: 1000 });
  const { data: categories } = data || {};
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!page) {
      setPage(1); 
    }
  }, [page]);

  const handleMouseEnter = (id) => {
    setHoveredCategoryId(id);
  };

  const addToCategory = (name, subId) => {
    dispatch(hideMenu());
    navigate(`/category/${encodeURIComponent(name)}/${subId}`);
  };

  return (
    <div className="catalog-menu_container">
      {isLoading ? (
        <CatalogMenuLoader />
      ) : (
        categories &&
        categories.length > 0 && (
          <div className="catalog-menu_content">
            <Box className="catalog-menu_sidebar">
              {categories.map((el) => (
                <Box
                  key={el.id}
                  className="catalog-menu_content"
                  onMouseEnter={() => handleMouseEnter(el.id)}
                >
                  <Link to="#" className="catalog-menu_item">
                    <img src={el.icon_id} alt="" className="" />
                    <Text className="catalog-menu_link">{el.name_ru}</Text>
                  </Link>
                  <RightArrowIcon />
                </Box>
              ))}
            </Box>
            <Box className="catalog-menu_right">
              {categories.map((el) => (
                <Box
                  key={el.id}
                  className="sub-categories"
                  style={{
                    display: hoveredCategoryId === el.id ? "block" : "none",
                  }}
                >
                  <h1 className="subcategory-title">{el.name_ru}</h1>
                  {el.subcategories &&
                    el.subcategories.map((subcat) => (
                      <Box key={subcat.id} mb={"12px"}>
                        <Box
                          cursor={"pointer"}
                          onClick={() =>
                            addToCategory(subcat.name_ru, el.id, subcat.id)
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
          </div>
        )
      )}
    </div>
  );
};

export default CatalogMenu;
