import { Link } from "react-router-dom";

const Navigationbar = () => {
  return (
    <>
      <h1>Navigation Bar</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home Page</Link>
          </li>
          <li>
            <Link to="/ShoppingCart">Shopping Cart</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigationbar;
