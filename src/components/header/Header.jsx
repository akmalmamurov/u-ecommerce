import {Navbar} from "../navbar";
import HeaderMid from "./HeaderMid";
import HeaderTop from "./HeaderTop";

export const Header = () => {
  return (
    <header>
      <HeaderTop />
      <HeaderMid />
      <Navbar />
    </header>
  );
};

export default Header;
