import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./SignupValidation";
import axios from "axios";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
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
    // data send to server command
    if (errors.name === "" && errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:5000/signup", values)
        .then((res) => {
          navigate("/");
          alert("Your account has been created");
        })
        .catch((error) => {
          alert("Your error is :", error);
        });
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center bg-info vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2 className="text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              className="form-control rounded-0"
              onChange={handleInput}
            />
            {errors.name && (
              <span className="text-danger text-center">{errors.name}</span>
            )}
          </div>
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
          <button className="btn btn-success w-100">Sign Up</button>
          <p className="text-center mt-3">
            Are you agree to our terms and conditions
          </p>
          <p className="text-center" type="submit">
            Already have an account ?
            <Link to="/" className="">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
