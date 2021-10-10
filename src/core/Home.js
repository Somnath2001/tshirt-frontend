import React, { useState, useEffect, useContext } from "react";
import { API } from "../backend";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { filterContext } from "./SearchFilter";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useContext(filterContext);

  const loadAllProduct = () => {
    getProducts()
      .then((data) => {
        // console.log(data);
        if (data.error) {
          setError(data.error);
        } else {
          setProducts(data);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    loadAllProduct();
  }, []);

  return (
    <Base
      title="Welcome to Tshirts World of TeeLove"
      description="Explore tshirts brand"
    >
      <div className="row text-center">
        <h1 className="text-info mb-5">All of Your Tshirts</h1>
        <div className="row">
          {products
            .filter((product) => {
              if (searchTerm == "") {
                return product;
              } else if (
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return product;
              }
            })
            .map((product, index) => {
              return (
                <div key={index} className="col-md-4 mb-3 Card">
                  <Card product={product} />
                </div>
              );
            })}
        </div>
      </div>
    </Base>
  );
};

export default Home;
