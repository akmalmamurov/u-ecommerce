import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/layout";
const VerifyCode = lazy(() => import("./pages/verify-code/VerifyCode"));
const Home = lazy(() => import("./pages/home/Home"));
const Favourites = lazy(() => import("./pages/favourites/Favourites"));
const Cart = lazy(() => import("./pages/cart/Cart"));

function App() {
  return (
    <Suspense>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
          <Route path="/verify-code" element={<VerifyCode />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
