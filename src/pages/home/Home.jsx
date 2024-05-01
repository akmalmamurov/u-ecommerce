import {motion} from "framer-motion"
import { Banner } from "./components/banner";
import Product from "./components/product/Product";
export const Home = () => {
  return (
    <>
       <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
      >
        <Banner />
      </motion.div>
      <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
      >
        <Product />
      </motion.div>
    </>
  );
};

export default Home;
