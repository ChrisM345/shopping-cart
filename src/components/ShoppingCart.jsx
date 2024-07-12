// import { useLocation } from "react-router-dom";
import { useState } from "react";
import minus from "../assets/minus-box.svg";
import plus from "../assets/plus-box.svg";
import trash from "../assets/trash-can.svg";
import "../styles/ShoppingCart.css";

const CartPage = () => {
  //Had issues with the below when using back and forward buttons

  // const location = useLocation();

  // const [quantity, setQuantity] = useState(() => {
  //   const { quantity } = location.state;
  //   return quantity || 0;
  // });

  // const [cartData, setCartData] = useState(() => {
  //   const { cartData } = location.state;
  //   return cartData || [];
  // });

  //Grab data from localStorage
  const [quantity, setQuantity] = useState(() => {
    const savedData = localStorage.getItem("numberOfItems");
    return parseInt(savedData) || 0;
  });

  const [cartData, setCartData] = useState(() => {
    const savedData = localStorage.getItem("cartData");
    return JSON.parse(savedData) || [];
  });

  //Go through the data and add up item quantities to get the total
  let total = 0;
  cartData.map((product) => {
    total = total + product.price * product.quantity;
  });

  //Buying items deletes localStorage data
  function handleBuyItems() {
    localStorage.removeItem("numberOfItems");
    localStorage.removeItem("cartData");
    setQuantity(0);
    setCartData([]);
    alert("Items Bought");
  }

  //Handles minus button for removing one item
  function handleCartRemoveItem(index) {
    let tempCartData = cartData;
    let tempItemQuantity = tempCartData[index].quantity - 1;
    tempCartData[index].quantity = tempItemQuantity;

    setCartData(tempCartData);
    setQuantity(quantity - 1);
    localStorage.setItem("cartData", JSON.stringify(tempCartData));
    localStorage.setItem("numberOfItems", quantity - 1);
  }

  //Handles add button for adding one item
  function handleCartAddItem(index) {
    let tempCartData = cartData;
    let tempItemQuantity = tempCartData[index].quantity + 1;
    tempCartData[index].quantity = tempItemQuantity;

    setCartData(tempCartData);
    setQuantity(quantity + 1);
    localStorage.setItem("cartData", JSON.stringify(tempCartData));
    localStorage.setItem("numberOfItems", quantity + 1);
  }

  //Removes entire item
  function handleCartItemDelete(index) {
    let tempCartData = cartData;
    let tempQuantity = tempCartData[index].quantity;
    tempCartData[index].quantity = 0;
    setCartData(tempCartData);
    tempQuantity = quantity - tempQuantity;
    setQuantity(tempQuantity);
    localStorage.setItem("cartData", JSON.stringify(tempCartData));
    localStorage.setItem("numberOfItems", tempQuantity);
  }

  return (
    <>
      <div className="cartNav">
        <h1>Cart Page: {quantity} Items</h1>
      </div>
      <div className="cartTotal">
        <h2>Cart Total: {total.toFixed(2)}</h2>
        <button onClick={handleBuyItems}>Buy Now</button>
      </div>
      <div className="cartCardContainer">
        {cartData
          .filter((product) => product.quantity > 0)
          .map((product) => {
            return (
              <div key={product.id} className="cartCard">
                <h3>{product.title}</h3>
                <img className="cartImages" src={product.image} />
                <div className="cartButtons">
                  <img src={minus} alt="" onClick={() => handleCartRemoveItem(product.id - 1)} />
                  Quantity: {product.quantity}
                  <img src={plus} alt="" onClick={() => handleCartAddItem(product.id - 1)} />
                </div>
                <div className="cartButtonDelete">
                  <img src={trash} alt="" onClick={() => handleCartItemDelete(product.id - 1)} />
                </div>
                <h3>
                  Price: ${product.price.toFixed(2)}
                  <br />
                  Total: ${(product.price * product.quantity).toFixed(2)}
                </h3>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default CartPage;
