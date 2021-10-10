import React, { Fragment, useContext, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";
import logo from "./logo.jpeg";
import { FcMenu } from "react-icons/fc";
import { filterContext } from "./SearchFilter";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Menu = ({ history }) => {
  const [searchTerm, setSearchTerm] = useContext(filterContext);
  return (
    <div>
      <nav className="navbar navbar-expand-lg  bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src={logo}
              alt="logo"
              style={{ borderRadius: "100%", height: "55px" }}
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggler"
            aria-controls="navbarToggler"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon p-1">
              <FcMenu />
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarToggler">
            <ul className="nav bg-dark me-auto mb-1 mb-lg-0 navbar-nav text-center">
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/")}
                  className="nav-link"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/cart")}
                  className="nav-link"
                  to="/cart"
                >
                  Cart
                </Link>
              </li>
              {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item">
                  <Link
                    style={currentTab(history, "/user/dashboard")}
                    className="nav-link"
                    to="/user/dashboard"
                  >
                    User-Dashboard
                  </Link>
                </li>
              )}
              {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                  <Link
                    style={currentTab(history, "/admin/dashboard")}
                    className="nav-link"
                    to="/admin/dashboard"
                  >
                    Admin-Dashboard
                  </Link>
                </li>
              )}
              {!isAuthenticated() && ( //conditional rendering when not Authenticated
                <Fragment>
                  <li className="nav-item">
                    <Link
                      style={currentTab(history, "/signup")}
                      className="nav-link"
                      to="/signup"
                    >
                      SignUp
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      style={currentTab(history, "/signin")}
                      className="nav-link"
                      to="/signin"
                    >
                      SignIn
                    </Link>
                  </li>
                </Fragment>
              )}
              {isAuthenticated() && ( //conditional rendering when Authenticated
                <li className="nav-item">
                  <span
                    className="nav-link text-warning"
                    onClick={() => {
                      signout(() => {
                        history.push("/");
                      });
                    }}
                  >
                    Signout
                  </span>
                </li>
              )}
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default withRouter(Menu);
