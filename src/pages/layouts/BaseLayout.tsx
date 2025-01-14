import { Outlet } from "react-router";

import NavBar from "../../components/navigations/NavBar";
import Footer from "../../components/navigations/Footer";

export default function BaseLayout() {
  return (
    <>
      <NavBar />

      <Outlet />

      <Footer />
    </>
  );
}
