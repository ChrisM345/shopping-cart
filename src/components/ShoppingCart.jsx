import { useLocation } from "react-router-dom";
import { useState } from "react";
import minus from "../assets/minus-box.svg";
import plus from "../assets/plus-box.svg";
import trash from "../assets/trash-can.svg";
import "../styles/ShoppingCart.css";

const CartPage = () => {
  const location = useLocation();

  const [quantity, setQuantity] = useState(() => {
    const { quantity } = location.state;
    return quantity || 0;
  });

  const [cartData, setCartData] = useState(() => {
    const { cartData } = location.state;
    return cartData || [];
  });

  let total = 0;
  cartData.map((product) => {
    total = total + product.price * product.quantity;
  });
  console.log(cartData);

  function handleBuyItems() {
    localStorage.removeItem("numberOfItems");
    localStorage.removeItem("cartData");
    setQuantity(0);
    console.log(quantity);
    setCartData([]);
    alert("Items Bought");
  }

  function handleCartRemoveItem(index) {
    let tempCartData = cartData;
    let tempQuantity = tempCartData[index].quantity - 1;
    tempCartData[index].quantity = tempQuantity;

    setCartData(tempCartData);
    setQuantity(tempQuantity);
    localStorage.setItem("cartData", JSON.stringify(tempCartData));
    localStorage.setItem("numberOfItems", tempQuantity);
  }

  function handleCartAddItem(index) {
    let tempCartData = cartData;
    let tempQuantity = tempCartData[index].quantity + 1;
    tempCartData[index].quantity = tempQuantity;

    setCartData(tempCartData);
    setQuantity(tempQuantity);
    localStorage.setItem("cartData", JSON.stringify(tempCartData));
    localStorage.setItem("numberOfItems", tempQuantity);
  }

  function handleCartItemDelete(index) {
    console.log("delete!");
    console.log(cartData);
    console.log(index);
    console.log(cartData[index]);
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
