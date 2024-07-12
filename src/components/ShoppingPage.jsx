import { useState, useEffect } from "react";
import "../styles/Shoppingpage.css";
import { Link } from "react-router-dom";

const ShopPage = () => {
  //Check localStorage for quantity data. If no data, set to 0
  const [cartQuantity, setCartQuantity] = useState(() => {
    const savedData = localStorage.getItem("numberOfItems");
    return parseInt(savedData) || 0;
  });

  //Check localStorage for cartData. If no data, set to empty array
  const [cartItems, setCartItems] = useState(() => {
    const savedData = localStorage.getItem("cartData");
    const initialData = JSON.parse(savedData);
    return initialData || [];
  });

  const [products, setProducts] = useState([]);
  const [productQty, setProductQty] = useState();
  const [loading, setLoading] = useState(true);

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
        setProducts(json);
        if (cartItems.length == 0) {
          setCartItems(json);
        } else {
          setProducts(cartItems);
        }
        setProductQty(Array(json.length).fill(1));
      })
      .finally(() => setLoading(false));
  }, [cartItems]);

  //Updates quantity selection of each item
  function handleQuantityUpdate(e, index) {
    let copiedProductQty = [...productQty];
    copiedProductQty[index] = e.target.value;
    setProductQty(copiedProductQty);
  }

  function handleAddItem(index) {
    let tempProductsData = products;
    tempProductsData[index].quantity = parseInt(tempProductsData[index].quantity) + parseInt(productQty[index]);
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
              <h2>{product.title}</h2>
              <img className="productImages" src={product.image} />
              <br />
              {product.description}
              <br />
              Price: ${product.price.toFixed(2)}
              <div className="productButtons">
                <button onClick={() => handleAddItem(product.id - 1)}>Add Item</button>
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
