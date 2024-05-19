import PropTypes from "prop-types";
import "./CategoriesCard.scss";
import { Box } from "@chakra-ui/react";
import theme from "../../../theme";
import { Link } from "react-router-dom";

const CategoriesCard = ({ category }) => {
  console.log(category);
  return (
    <Box className="categories-card_item" fontFamily={theme.fonts.fInter}>
      <div key={category.id} className="categories-card_content">
        <div className="categories-card_header">
          <div className="categories-card_img">
            <img
              src={category.icon_id}
              alt="categories-icon"
              className="categories-card_icon"
            />
          </div>
          <Link to={`/category/${category.name_ru}/${category.id}`} className="categories-card_title">{category.name_ru}</Link>
        </div>
        <div className="categories-card_body">
          {category.subcategories &&
            category.subcategories.length > 0 &&
            category.subcategories.map((subcategory) => (
              <div key={subcategory.id} className="categories-card_body-item">
                <Link to={`/category/${subcategory.name_ru}/${subcategory.id}`} className="categories-card_link">
                  {subcategory.name_ru}
                </Link>
              </div>
            ))}
        </div>
      </div>
    </Box>
  );
};

CategoriesCard.propTypes = {
  category: PropTypes.object,
};

export default CategoriesCard;
