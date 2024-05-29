import { Banner } from "./components/banner";
import Brands from "./components/brands/Brands";
import Product from "./components/product/Product";
export const Home = () => {
  return (
    <>
      <div>
        <Banner />
      </div>
      <Brands/>
      <div>
        <Product />
      </div>
    
    </>
  );
};

export default Home;
