import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Read = () => {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/read/" + id)
      .then((res) => {
        // console.log(res);
        setUser(res?.data[0]);
      })
      .then((error) => console.log(error));
  }, []);
  // console.log(user);

  return (
    <div
      className="d-flex vh-100 justify-content-center align-items-center"
      style={{ backgroundColor: "#9FE2BF" }}>
      <div className="w-50 bg-white rounded p-3">
        <div>
          <h2 className="text-center my-2">User Details</h2>
          <h4>User ID: {user.id}</h4>
          <h5>User Name: {user.name}</h5>
          <h6>User Email: {user.email}</h6>
        </div>
        <Link to="/home" className="btn btn-info mt-3 me-3">
          Back to Home
        </Link>
        <Link to={`/edit/${user?.id}`} className="btn btn-secondary mt-3">
          Edit
        </Link>
      </div>
    </div>
  );
};

export default Read;
