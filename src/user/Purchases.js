import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getUser, UserPurchaseList } from "./helper/userapicalls";

const Purchases = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState([]);

  const preload = (userId) => {
    UserPurchaseList(userId, token).then((data) => {
      setValues(data.purchases);
    });
  };
  useEffect(() => {
    preload(match.params.userId);
  }, []);

  return (
    <Base
      title="Your Recents Purchases"
      description="Purchases history of user"
    >
      {
        (values[0] = values[0] ? (
          <div className="card bg-info p-1 text-center">
            {values.map((Purchase, index) => {
              return (
                <div key={index} className="mb-3 mt-3 card">
                  <div className="card-header text-info">PURCHASE</div>
                  <ul
                    style={{ listStyle: "none" }}
                    className="list-group list-group-flush"
                  >
                    <li className="list-group-item">
                      Product Name: {Purchase.name}
                    </li>
                    <li className="list-group-item">
                      Product Category:{Purchase.category.name}
                    </li>
                    <li className="list-group-item">
                      Product price: {Purchase.amount}$
                    </li>
                    <li className="list-group-item">
                      Product Description: {Purchase.description}
                    </li>
                    <li className="list-group-item">
                      Product tranctionID: {Purchase.transaction_id}
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-info ">
            You have not Purchase yet.Please Purchase something
          </div>
        ))
      }
    </Base>
  );
};

export default Purchases;
