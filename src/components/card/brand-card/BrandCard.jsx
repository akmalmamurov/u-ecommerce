import PropTypes from "prop-types"
import "./BrandCard.scss"
const BrandCard = ({image}) => {
  return (
    <div className="brand-card">
      <img src={image} alt="brand" className="brand-card_img" />
    </div>
  )
}
BrandCard.propTypes = {

  image: PropTypes.string,
}
export default BrandCard