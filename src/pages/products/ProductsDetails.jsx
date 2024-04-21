import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../redux/services/productAllServices";

const ProductsDetails = () => {
  const id = useParams();
  const {data} = useGetProductByIdQuery(id);
  return (
    <div>
      {data?.map((el) => {
        <div key={el?.id}>
          <h1>{el?.name_ru}</h1>
          <p>{el?.description_ru}</p>
        </div>;
      })}
    </div>
  );
};

export default ProductsDetails;
