import { useParams } from "react-router-dom"

const ProductsInner = () => {
    const productId = useParams();
    console.log(productId);
  return (
    <div>ProductsInner</div>
  )
}

export default ProductsInner