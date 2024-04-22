import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../redux/services/productAllServices";

const ProductsDetails = () => {
  const { id } = useParams();
  const { data } = useGetProductByIdQuery(id);

  return (
    <div>
      {data && (
        <div>
          <h1>{data.name_ru}</h1>
          <p>{data.description_ru}</p>
        </div>
      )}
    </div>
  );
};

export default ProductsDetails;
