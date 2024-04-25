import { Link, useParams } from "react-router-dom";
import { useGetProductsByCidQuery } from "../../redux/services/productAllServices";
import "./Category.scss";
import ProductCard from "../../components/card/product-card/ProductCard";
import { Box, Container, Grid, GridItem } from "@chakra-ui/react";
import { useGetCategoriesByIdQuery } from "../../redux/services/categoryServices";
import theme from "../../theme";

const Category = () => {
  const { id } = useParams();
  const { data: products } = useGetProductsByCidQuery(id);
  const { data: category } = useGetCategoriesByIdQuery(id);
  return (
    <div className="category-page">
      <Container maxW={"1200px"}>
        {category && (
          <Box fontFamily={theme.fonts.fSf}>
            <h1 className="category-page_title">{category.name_ru}</h1>
          </Box>
        )}
        <Grid templateColumns={"repeat(12, 1fr)"}>
          <GridItem colSpan={2}>
            {category && category.subcategories && (
              <Box
                fontFamily={theme.fonts.fSf}
                className="category-page_breadcrumb"
                mb={"24px"}
              >
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  gap={"12px"}
                  className="category-page_subcategory"
                >
                  {category.subcategories.map((subcategory) => (
                    <Box key={subcategory.id}>
                      <Link to={`/category/${subcategory.id}`} className="ctPage-subcategory_title">
                        {subcategory.name_ru}
                      </Link>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </GridItem>
          <GridItem colSpan={10}>
            {products && (
              <Grid templateColumns="repeat(4, 1fr)" gap={"6px"}>
                {products.map((product) => (
                  <div key={product.id}>
                    <GridItem>
                      <ProductCard {...product} />
                    </GridItem>
                  </div>
                ))}
              </Grid>
            )}
          </GridItem>
        </Grid>
      </Container>
    </div>
  );
};

export default Category;
