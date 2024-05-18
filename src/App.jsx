import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/layout";
const Home = lazy(() => import("./pages/home/Home"));
const Favourites = lazy(() => import("./pages/favourites/Favourites"));
const Cart = lazy(() => import("./pages/cart/Cart"));
const Category = lazy(() => import("./pages/category/Category"));
const ProductsDetails = lazy(() => import("./pages/products/ProductsDetails"));
const AnswerPage = lazy(() => import("./pages/answer"));
const CheckoutPage = lazy(() => import("./pages/checkout/CheckoutPage"));
const AllCategories = lazy(() =>
  import("./pages/all-categories/AllCategories")
);

function App() {
  return (
    <Suspense>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="favourites" element={<Favourites />} />
            <Route path="cart" element={<Cart />} />
            <Route path="category/:name/:id" element={<Category />} />
            <Route path="products/:id" element={<ProductsDetails />} />
            <Route path="answer" element={<AnswerPage />} />
            <Route path="categories" element={<AllCategories />} />
          </Route>
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
