import { Outlet } from "react-router-dom";
import Navigationbar from "./Navigation";
import "../styles/HomePage.css";

const Homepage = () => {
  return (
    <>
      <Navigationbar />
      <Outlet />
    </>
  );
};

export default Homepage;
