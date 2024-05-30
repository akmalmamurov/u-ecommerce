import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "@chakra-ui/react";
import { useGetProductsByCidQuery } from "../../redux/services/productAllServices";
import { useGetCategoriesByIdQuery } from "../../redux/services/categoryServices";
import CategoryPageLeft from "./category-left/CategoryPageLeft";
import CategoryPageRight from "./category-right/CategoryPageRight";
import "./Category.scss";

const Category = () => {
  const { id } = useParams();
  const [selectedCategoryId, setSelectedCategoryId] = useState(id);

  useEffect(() => {
    setSelectedCategoryId(id);
  }, [id]);

  const { data: products } = useGetProductsByCidQuery(selectedCategoryId);
  const { data: category } = useGetCategoriesByIdQuery(id);

  return (
    <div className="category-page">
      <Container maxW={"1200px"}>
        <div className="category-page_content">
          <div className="category-page_left">
            <CategoryPageLeft
              category={category}
              id={id}
              setSelectedCategoryId={setSelectedCategoryId}
            />
          </div>
          <div className="category-page_right">
            <CategoryPageRight
              products={products}
              selectedCategoryId={selectedCategoryId}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Category;
