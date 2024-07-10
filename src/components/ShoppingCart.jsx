import { useLocation } from "react-router-dom";
import "../styles/ShoppingCart.css";

const CartPage = () => {
  const location = useLocation();
  const { cartData } = location.state;
  const { quantity } = location.state;
  console.log(cartData);
  return (
    <>
      <h1>Cart Page {quantity}</h1>
      <div className="cartCardContainer">
        {cartData
          .filter((product) => product.quantity > 0)
          .map((product) => {
            return (
              <div key={product.id} className="cartCard">
                <h2>{product.title}</h2>
                <img className="cartImages" src={product.image} />
                Price: ${product.price}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default CartPage;
