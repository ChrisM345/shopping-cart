import { Link, Outlet } from "react-router-dom";
import Navigationbar from "./Navigation";

const Homepage = () => {
  return (
    <>
      <Navigationbar />
      <Outlet />
    </>
  );
};

export default Homepage;
