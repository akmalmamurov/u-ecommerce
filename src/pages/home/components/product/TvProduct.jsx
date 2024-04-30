// import { Container } from "@chakra-ui/react";
// import { motion } from "framer-motion";
// import { useGetAllProductsQuery } from "../../../../redux/services/productAllServices";
// import GridProduct from "../../../../components/product-grid/GridProduct";
// import { ProductCard } from "../../../../components/card/product-card";
// import "./Product.scss";
// import { memo } from "react";
// import Loading from "../../../../components/loading/Loading";
// const TvProduct = memo(() => {
//   const { data: products, isLoading } = useGetAllProductsQuery();
//   console.log(products);

//   const tvProducts = products?.filter((product) => {
//     return product.category?.name_ru === "Смарт-тв";
//   });
//   return (
//     <section className="home-product">
//       <Container maxW={"1200px"}>
//         <motion.h1>Смарт-тв</motion.h1>
//         <GridProduct>
//           {isLoading ? (
//             <div>
//               <Loading />
//             </div>
//           ) : (
//             tvProducts?.map((product) => (
//               <ProductCard key={product.id} {...product} />
//             ))
//           )}
//         </GridProduct>
//       </Container>
//     </section>
//   );
// });
// TvProduct.displayName = "Product";
// export default TvProduct;
