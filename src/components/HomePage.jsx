import { Link } from "react-router-dom";
import Navigationbar from "./Navigation";

const Homepage = () => {
  return (
    <>
      <Navigationbar />
      <h1>Home Page</h1>
      <Link to="ShoppingCart">Shopping Cart</Link>
    </>
  );
};

export default Homepage;
