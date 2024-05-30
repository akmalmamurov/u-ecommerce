import PropTypes from "prop-types";
import "./BrandCard.scss";
import { useNavigate } from "react-router-dom";
const BrandCard = ({ image, id }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/brand/${id}`);
  };
  return (
    <div className="brand-card" onClick={() => handleClick(id)}>
      <img src={image} alt="brand" className="brand-card_img" />
    </div>
  );
};
BrandCard.propTypes = {
  id: PropTypes.string,
  image: PropTypes.string,
};
export default BrandCard;
