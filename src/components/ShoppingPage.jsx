import Navigationbar from "./Navigation";
import { useState, useEffect } from "react";
import "../styles/Shoppingpage.css";

const ShopPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [productQty, setProductQty] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        json.forEach((product) => (product.quantity = 0));
        console.log(json);

        setProducts(json);
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
    tempProductsData[index].quantity = productQty[index];
    // console.log(tempProductsData);
    setProducts(tempProductsData);
  }

  return loading ? (
    <>
      <p>Loading</p>
    </>
  ) : (
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
