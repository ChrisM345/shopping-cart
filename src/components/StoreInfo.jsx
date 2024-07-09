import { useState, useEffect } from "react";

function StoreData() {
  const [products, setProducts] = useState([]);
  const [productQty, setProductQty] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products", { mode: "cors" })
      .then((res) => res.json())
      .then((json) => {
        json.forEach((product) => (product.quantity = 0));
        // console.log(json);
        setProducts(json);
        setProductQty(Array(json.length).fill(1));
      })

      .finally(() => setLoading(false));
  }, []);

  return { products };
}

export default StoreData;
