import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from "axios";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(Validation(values));
    // data get from api command
    if (errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:5000/login", values)
        .then((res) => {
          if (res.data.Login) {
            localStorage.setItem("token", res.data.token);
            navigate("/home");
          } else {
            alert("No record Found");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-info vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2 className="text-center">Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="form-control rounded-0"
              onChange={handleInput}
            />
            {errors.email && (
              <span className="text-danger text-center">{errors.email}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              className="form-control rounded-0"
              onChange={handleInput}
            />
            {errors.password && (
              <span className="text-danger text-center">{errors.password}</span>
            )}
          </div>
          <button type="submit" className="btn btn-success w-100">
            Log in
          </button>
          <p className="text-center mt-3">
            Are you agree to our terms and conditions
          </p>
          <p className="text-center">
            Are you new ?
            <Link to="/signup" className="">
              Create an Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
