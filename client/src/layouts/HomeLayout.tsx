import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HomeLayout = () => {
  return (
    <>
      <Box transition="0.25s">
        <Navbar />
        <Outlet />
        <Footer />
      </Box>
    </>
  );
};

export default HomeLayout;
