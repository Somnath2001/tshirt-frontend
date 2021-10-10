import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link, useHistory } from "react-router-dom";

import { getCategory, updateCategory } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
  const [catname, setCatname] = useState({
    name: "",
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { name } = catname; //destructuring the catname

  const { user, token } = isAuthenticated();

  const preload = (categoryId) => {
    getCategory(categoryId).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setCatname({
          name: data.name,
        });
      }
    });
  };
  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const handleChange = (event) => {
    setError("");
    setCatname({
      name: event.target.value,
    });
  };
  const history = useHistory();

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend request fired
    console.log(match.params.categoryId);
    console.log(user._id);
    console.log(token);
    console.log(name);
    updateCategory(match.params.categoryId, user._id, token, { name })
      .then((data) => {
        // console.log(data);
        if (data.error) {
          setError(true);
        } else {
          setError("");
          setSuccess(true);
          // setCatname({name:""});
        }
      })
      .catch((err) => console.log(err));
    setTimeout(() => {
      history.push("/admin/categories");
    }, 2000);
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category updated successfully</h4>;
    }
  };
  const warningMessage = () => {
    if (error) {
      return <h4 className="text-success">Failed to Update Category</h4>;
    } //or we set the data.error comes from backend
  };

  const goBack = () => (
    <div className="mt-5">
      <Link
        className="btn btn-sm btn-success mb-3 rounded"
        to="/admin/dashboard"
      >
        Admin Home
      </Link>
    </div>
  );

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the category</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange}
          value={name}
          autoFocus
          required
          placeholder="For Ex. Summer"
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Update Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Update a category here"
      description="Update a old Category for Tshirts"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
