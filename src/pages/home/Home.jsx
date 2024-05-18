import { Banner } from "./components/banner";
import Product from "./components/product/Product";
export const Home = () => {
  return (
    <>
      <div>
        <Banner />
      </div>
      <div>
        <Product />
      </div>
    </>
  );
};

export default Home;
