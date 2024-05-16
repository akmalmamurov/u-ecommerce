import { Link, useParams } from "react-router-dom";
import { Box, Container, Grid } from "@chakra-ui/react";
import { useGetProductsByCidQuery } from "../../redux/services/productAllServices";
import {
  useGetCategoriesBrandQuery,
  useGetCategoriesByIdQuery,
} from "../../redux/services/categoryServices";
import ProductCard from "../../components/card/product-card/ProductCard";
import theme from "../../theme";
import "./Category.scss";

const Category = () => {
  const { id } = useParams();
  const { data: products } = useGetProductsByCidQuery(id);
  const { data: category } = useGetCategoriesByIdQuery(id);
  const { data: brand } = useGetCategoriesBrandQuery(id);

  return (
    <div className="category-page">
      <Container maxW={"1200px"}>
        <div className="category-page_content">
          <div className="category-page_left">
            {category && category.subcategories && (
              <Box
                fontFamily={theme.fonts.fSf}
                className="category-page_breadcrumb"
              >
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  gap={"12px"}
                  className="category-page_subcategory"
                >
                  <Box fontFamily={theme.fonts.fSf}>
                    <h1 className="category-page_title">{category.name_ru}</h1>
                  </Box>
                  {category.subcategories.map((subcategory) => (
                    <Box key={subcategory.id}>
                      <Link
                        to={`/category/${subcategory.name_ru}/${subcategory.id}`}
                        className="ctPage-subcategory_title"
                      >
                        {subcategory.name_ru}
                      </Link>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </div>
          <div className="category-page_right">
            {brand && (
              <Box display={"flex"} gap={10} px={10} mb={20}>
                {brand.map((brand, index) => (
                  <Link key={index}>{brand.name}</Link>
                ))}
              </Box>
            )}
            <Box>
              {products && (
                <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                  {products.map((product) => (
                    <div key={product.id} style={{ flex: "0 0 33.33%" }}>
                      <ProductCard {...product} />
                    </div>
                  ))}
                </Grid>
              )}
            </Box>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Category;
