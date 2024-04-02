import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import {Header} from "../header";
import {Footer} from "../footer";

export const MainLayout = () => {
  return (
    <Fragment>
      <Header />
      <Outlet />
      <Footer />
    </Fragment>
  );
};

export default MainLayout;
