import Navigationbar from "./Navigation";
import { useState, useEffect } from "react";
import "../styles/Shoppingpage.css";
import { Link } from "react-router-dom";

const ShopPage = () => {
  const [cartQuantity, setCartQuantity] = useState(() => {
    const savedData = localStorage.getItem("numberOfItems");
    return parseInt(savedData) || 0;
  });
  const [products, setProducts] = useState([]);
  const [productQty, setProductQty] = useState();
  const [loading, setLoading] = useState(true);

  const [cartItems, setCartItems] = useState(() => {
    const savedData = localStorage.getItem("cartData");
    const initialData = JSON.parse(savedData);
    return initialData || [];
  });

  console.log(cartItems);

  useEffect(() => {
    // Storing cart data
    localStorage.setItem("cartData", JSON.stringify(cartItems));
  }, [cartItems, cartQuantity]);

  useEffect(() => {
    // Storing number of items in cart
    localStorage.setItem("numberOfItems", cartQuantity);
  }, [cartQuantity]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        json.forEach((product) => (product.quantity = 0));
        console.log(json);

        setProducts(json);
        if (cartItems.length == 0) {
          setCartItems(json);
        } else {
          setProducts(cartItems);
        }
        setProductQty(Array(json.length).fill(1));
      })

      .finally(() => setLoading(false));
  }, []);

  function handleQuantityUpdate(e, index) {
    let copiedProductQty = [...productQty];
    console.log(e.target.value);
    copiedProductQty[index] = e.target.value;
    setProductQty(copiedProductQty);
    console.log(productQty);
  }

  function handleAddItem(e, product, index) {
    // console.log(`Buying ${product.title} with quantity ${productQty[index]}`);
    let tempProductsData = products;
    tempProductsData[index].quantity = parseInt(tempProductsData[index].quantity) + parseInt(productQty[index]);
    // console.log(tempProductsData);
    setProducts(tempProductsData);
    setCartItems(products);
    setCartQuantity(cartQuantity + parseInt(productQty[index]));
  }

  return loading ? (
    <>
      <p>Loading</p>
    </>
  ) : (
    <>
      <div className="navigation">
        <div className="shopNav">
          <h1>Shop Page</h1>
          <ul>
            <li>
              <Link to="/ShoppingCart" state={{ cartData: cartItems, quantity: cartQuantity }}>
                Cart: {cartQuantity} Items
              </Link>
            </li>
          </ul>
        </div>
      </div>
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
              Price: ${product.price.toFixed(2)}
              <div className="productButtons">
                <button onClick={(e) => handleAddItem(e, product, product.id - 1)}>Add Item</button>
                <input
                  className="product-qty"
                  type="number"
                  name="product-quantity"
                  min="1"
                  value={productQty[product.id - 1]}
                  onChange={(e) => handleQuantityUpdate(e, product.id - 1)}
                ></input>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ShopPage;
