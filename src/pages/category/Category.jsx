import { useParams } from "react-router-dom";
import { Container } from "@chakra-ui/react";
import { useGetProductsByCidQuery } from "../../redux/services/productAllServices";
import "./Category.scss";
import {
  useGetCategoriesBrandQuery,
  useGetCategoriesByIdQuery,
} from "../../redux/services/categoryServices";
import CategoryPageLeft from "./category-left/CategoryPageLeft";
import CategoryPageRight from "./category-right/CategoryPageRight";
import { useEffect, useState } from "react";

const Category = () => {
  const { id } = useParams();
  const [selectedCategoryId, setSelectedCategoryId] = useState(id);

  useEffect(() => {
    setSelectedCategoryId(id);
  }, [id]);

  const { data: products } = useGetProductsByCidQuery(selectedCategoryId);
  const { data: category } = useGetCategoriesByIdQuery(id);
  const { data: brand } = useGetCategoriesBrandQuery(selectedCategoryId);
  
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
              brand={brand}
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
