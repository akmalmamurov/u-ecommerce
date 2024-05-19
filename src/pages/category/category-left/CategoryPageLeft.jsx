import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import theme from "../../../theme";
import "./CategoryPageLeft.scss";

const CategoryPageLeft = ({ category, setSelectedCategoryId }) => {
  const handleSubcategoryClick = (subcategoryId) => {
    setSelectedCategoryId(subcategoryId);
  };

  return (
    <div>
      <Box fontFamily={theme.fonts.fSf} className="category-page_breadcrumb">
        <Box fontFamily={theme.fonts.fSf}>
          {category && (
            <h1 className="category-page_title">{category.name_ru}</h1>
          )}
        </Box>
        <Box>
          {category &&
            category.subcategories &&
            category.subcategories.map((subcategory) => (
              <Box key={subcategory.id}>
                <Link
                  onClick={() => handleSubcategoryClick(subcategory.id)}
                  className={`ctPage-subcategory_title ${subcategory.id}`}
                >
                  {subcategory.name_ru}
                </Link>
              </Box>
            ))}
        </Box>
      </Box>
    </div>
  );
};

CategoryPageLeft.propTypes = {
  category: PropTypes.object,
  setSelectedCategoryId: PropTypes.func.isRequired,
};

export default CategoryPageLeft;
