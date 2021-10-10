import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link, useHistory } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getUser, updateUser } from "./helper/userapicalls";

const UpdateProfile = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    error: "",
    success: false,
    loading: false,
  });

  const { firstname, lastname, email, error, success, loading } = values;

  const preload = (userId) => {
    getUser(userId, token).then((data) => {
      // console.log(data);

      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.userId);
  }, []);

  const history = useHistory();

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    //   console.log(values);
    updateUser(match.params.userId, values, token)
      .then((data) => {
        // console.log(data);
        if (data.error) {
          setValues({ ...values, error: data.error, loading: true });
        } else {
          setValues({
            ...values,
            firstname: "",
            lastname: "",
            email: "",
            error: "",
            success: true,
          });
        }
      })
      .catch((error) => console.log(error));

    setTimeout(() => {
      history.push("/user/dashboard");
    }, 2000);
  };
  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues({ ...values, error: false, [name]: value });
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            User has been updated successfully
          </div>
        </div>
      </div>
    );
  };
  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div class="text-center mt-2">
          <div class="spinner-border text-success" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      )
    );
  };

  const Userupdateform = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">FirstName</label>
              <input
                className="form-control"
                onChange={handleChange("firstname")}
                type="text"
                value={firstname}
              />
            </div>
            <div className="form-group">
              <label className="text-light">LastName</label>
              <input
                className="form-control"
                onChange={handleChange("lastname")}
                type="text"
                value={lastname}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
              />
            </div>
            <button
              onClick={onSubmit}
              className="btn btn-success btn-block form-control my-3"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Update User" description="A page for user to update profile!">
      {loadingMessage()}
      {errorMessage()}
      {successMessage()}
      {Userupdateform()}
      {/* <p className="text-light text-center">{JSON.stringify(values)}</p> */}
    </Base>
  );
};

export default UpdateProfile;
