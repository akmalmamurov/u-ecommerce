import { Container } from "@chakra-ui/react";

import { useGetCategoriesQuery } from "../../redux/services/categoryServices";
import CategoriesCard from "components/card/categories-card/CategoriesCard";
import AllCategoriesLoader from "components/loader/all-categories-loader/AllCategoriesLoader";
import GridCategories from "components/product-grid/GridCategories";
import "./AllCategories.scss";

const AllCategories = () => {
  const { data, isLoading } = useGetCategoriesQuery();
  const { data: categories } = data || {};
  const filteredCategories = categories?.filter(
    (category) => category.subcategories && category.subcategories.length > 0
  );

  return (
    <div className="all-categories">
      <Container maxW={"1200px"}>
        <GridCategories>
          {isLoading ? (
            < AllCategoriesLoader/>
          ) : (
            filteredCategories.map((category) => (
              <CategoriesCard key={category.id} category={category} />
            ))
          )}
        </GridCategories>
      </Container>
    </div>
  );
};

export default AllCategories;
