import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/layout";
import { Home } from "./pages/home";
import { Register } from "./pages/register";
import { Login } from "./pages/login";
import { VerifyRegisrtation } from "./pages/verify";
import {Favourites} from "./pages/favourites";
import Cart from "./pages/cart/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="verifyRegistration" element={<VerifyRegisrtation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
