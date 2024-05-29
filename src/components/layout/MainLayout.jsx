import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../header";
import { Footer } from "../footer";
import "./MainLayout.scss"
export const MainLayout = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="main-layout">
      <Header />
      <Outlet />
      <Footer />
      <button
        className={`scroll-to-top ${showButton ? "show" : ""}`}
        onClick={scrollToTop}
      >
        ↑ Top
      </button>
    </div>
  );
};

export default MainLayout;
