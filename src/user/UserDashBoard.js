import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
import { getUser } from "./helper/userapicalls";

const UserDashBoard = () => {
  const {
    user: { _id },
  } = isAuthenticated();
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });
  const { firstname, lastname, email } = values;

  const preload = (_id) => {
    getUser(_id, token).then((data) => {
      setValues({
        ...values,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
      });
    });
  };
  useEffect(() => {
    preload(_id);
  }, []);

  const UserLeftSide = () => {
    return (
      <div className="cad">
        <h4 className="card-header bg-dark text-white">User Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to={`/user/${_id}`} className="nav-link text-success">
              Update Profile
            </Link>
          </li>
          <li className="list-group-item">
            <Link to={`/orders/user/${_id}`} className="nav-link text-success">
              Recent Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const UserRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">User Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge bg-success mr-2">FirstName:</span>{" "}
            {firstname}
          </li>
          <li className="list-group-item">
            <span className="badge bg-success mr-2">LastName:</span> {lastname}
          </li>
          <li className="list-group-item">
            <span className="badge bg-success mr-2">Email:</span> {email}
          </li>
          <li className="list-group-item">
            <span className="badge bg-danger">User</span>
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Base
      title="Welcome to User DashBoard"
      description="Manage all of Your Profile here"
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-md-3 mb-2">{UserLeftSide()}</div>
        <div className="col-md-9 mb-2">{UserRightSide()}</div>
      </div>
    </Base>
  );
};

export default UserDashBoard;
