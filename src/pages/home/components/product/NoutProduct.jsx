// import { Container } from "@chakra-ui/react";
// import { motion } from "framer-motion";
// import { useGetAllProductsQuery } from "../../../../redux/services/productAllServices";
// import GridProduct from "../../../../components/product-grid/GridProduct";
// import { ProductCard } from "../../../../components/card/product-card";
// import "./Product.scss";
// import { memo } from "react";
// import Loading from "../../../../components/loading/Loading";
// const NoutProduct = memo(() => {
//   const { data: products, isLoading } = useGetAllProductsQuery();
//   const noutProducts = products?.filter((product) => {
//     return product.category?.name_ru === "Игровые ноутбуки";
//   });
//   return (
//     <section className="home-product">
//       <Container maxW={"1200px"}>
//         <motion.h1>Hоутбуки</motion.h1>
//         <GridProduct>
//           {isLoading ? (
//             <div>
//               <Loading />
//             </div>
//           ) : (
//             noutProducts?.map((product) => (
//               <ProductCard key={product.id} {...product} />
//             ))
//           )}
//         </GridProduct>
//       </Container>
//     </section>
//   );
// });
// NoutProduct.displayName = "Product";
// export default NoutProduct;
