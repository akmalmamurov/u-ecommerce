import { useParams } from "react-router-dom";
import "./BrandPage.scss";
import { Box, Container } from "@chakra-ui/react";
import { useGetBrandByIdQuery } from "../../redux/services/brandServices";
import theme from "theme";
const BrandPage = () => {
  const { id } = useParams();
  const { data: brand } = useGetBrandByIdQuery(id);
  return (
    <div className="brand-page">
      <Container maxW={"1200px"}>
        <Box
          className="brand-page_content"
          fontFamily={theme.fonts.fInter}
        >
          
        </Box>
      </Container>
    </div>
  );
};

export default BrandPage;
