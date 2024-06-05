import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { MainLayout } from "components/layout";
import MyOrders from "pages/order/MyOrders";
import { ScrollTop } from "./components/scroll";
import Loading from "./components/loading/Loading";
const BrandPage = lazy(() => import("pages/brands-page/BrandPage"));
const Home = lazy(() => import("pages/home/Home"));
const Favourites = lazy(() => import("pages/favourites/Favourites"));
const Cart = lazy(() => import("pages/cart/Cart"));
const Category = lazy(() => import("pages/category/Category"));
const ProductsDetails = lazy(() => import("pages/products/ProductsDetails"));
const AnswerPage = lazy(() => import("pages/answer/AnswerPage"));
const CheckoutPage = lazy(() => import("pages/checkout/CheckoutPage"));
const UserProfile = lazy(() => import("pages/user/UserProfile"));
const AllCategories = lazy(() => import("pages/all-categories/AllCategories"));

function App() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  return (
    <Suspense fallback={<div><Loading/></div>}>
      <BrowserRouter>
        <ScrollTop />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="favourites" element={<Favourites />} />
            <Route path="cart" element={<Cart />} />
            <Route path="category/:name/:id" element={<Category />} />
            <Route path="products/:id" element={<ProductsDetails />} />
            <Route path="faq" element={<AnswerPage />} />
            <Route path="categories" element={<AllCategories />} />
            <Route path="brand/:id" element={<BrandPage />} />
            <Route
              path="profile"
              element={isAuth ? <UserProfile /> : <Navigate to="/" />}
            />
            <Route
              path="orders"
              element={isAuth ? <MyOrders /> : <Navigate to="/" />}
            />
          </Route>
          <Route
            path="/checkout"
            element={isAuth ? <CheckoutPage /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
