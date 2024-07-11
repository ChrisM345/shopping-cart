import { Link } from "react-router-dom";
import "../styles/Navigation.css";

const Navigationbar = () => {
  return (
    <div className="navigationBar">
      <h1>Navigation</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home Page</Link>
          </li>
          <li>
            <Link to="/ShoppingPage">Shopping Page</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigationbar;
