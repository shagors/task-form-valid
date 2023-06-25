import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
  });

  // data get from server by id based and show data
  useEffect(() => {
    axios
      .get("http://localhost:5000/read/" + id)
      .then((res) => {
        // console.log(res);
        setValues({
          ...values,
          name: res?.data[0].name,
          email: res?.data[0].email,
        });
      })
      .then((error) => console.log(error));
  }, []);
  //   console.log(values);

  // Data update api call for server
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:5000/update/" + id, values)
      .then((res) => {
        console.log(res);
        navigate("/home");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div
      className="d-flex vh-100 justify-content-center align-items-center"
      style={{ backgroundColor: "#9FE2BF" }}>
      <div className="w-50 bg-white rounded p-3">
        <div className="d-flex justify-content-end">
          <Link to="/home" className="btn btn-primary">
            Back
          </Link>
        </div>
        <form onSubmit={handleUpdate}>
          <h2>Update User Data</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
  );
};

export default Update;
