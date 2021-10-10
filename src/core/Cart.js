import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCard } from "./helper/cartHelper";
import Payment from "./payment";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCard());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        <h2 className="mb-4 text-info">Products You Selected</h2>
        {products.map((product, index) => {
          return (
            <Card
              key={index}
              product={product}
              removeFromCart={true}
              addtoCart={false}
              setReload={setReload}
              reload={reload}
            />
          );
        })}
      </div>
    );
  };
  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row text-center">
        <div className="col-md-6">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h3>No Products in the Cart</h3>
          )}
        </div>
        <div className="col-md-6">
          {isAuthenticated() ? (
            <Payment products={products} setReload={setReload} />
          ) : (
            <h2 className="text-info ">Please SignIn for Purchase</h2>
          )}
        </div>
      </div>
    </Base>
  );
};

export default Cart;
