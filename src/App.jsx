import { Outlet } from "react-router";
import Footer from "./components/shared/Footer";
import Navbar from "./components/shared/Navbar";
import ScrollToTop from "./ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <ScrollToTopButton />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
