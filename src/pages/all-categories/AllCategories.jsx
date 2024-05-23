import { Container } from "@chakra-ui/react";
import { useGetCategoriesQuery } from "../../redux/services/categoryServices";
import Loading from "../../components/loading/Loading";
import CategoriesCard from "../../components/card/categories-card/CategoriesCard";
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
        <div className="all-categories_content">
          {isLoading ? (
            <Loading />
          ) : (
            filteredCategories.map((category) => (
              <CategoriesCard key={category.id} category={category} />
            ))
          )}
        </div>
      </Container>
    </div>
  );
};

export default AllCategories;
