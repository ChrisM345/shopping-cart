import Navigationbar from "./Navigation";
import { useState, useEffect } from "react";
import "../styles/Shoppingpage.css";

const ShopPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json));
  });

  return (
    <>
      <Navigationbar />
      <h1>Shop Page</h1>
      <div className="productCardContainer">
        {products.map((product) => {
          return (
            <div key={product.id} className="productCard">
              {/* {product.id} */}
              <h2>{product.title}</h2>
              <img className="productImages" src={product.image} />
              <br />
              {product.description}
              <br />
              Price: ${product.price}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ShopPage;
