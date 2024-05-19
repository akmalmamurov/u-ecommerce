import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { RightArrowIcon } from "../../assets/icons";
import "./CatalogMenu.scss";
import { useGetCategoriesQuery } from "../../redux/services/categoryServices";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";
import { useDispatch } from "react-redux";
import { hideMenu } from "../../redux/slices/menuSlices";

const CatalogMenu = () => {
  const { data, isLoading } = useGetCategoriesQuery();
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        <Loading />
      ) : (
        data &&
        data.length > 0 && (
          <div className="catalog-menu_content">
            <Box className="catalog-menu_sidebar">
              {data.map((el) => (
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
              {data.map((el) => (
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
