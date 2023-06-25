import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";

const Home = () => {
  const [data, setData] = useState([]);
  // console.log(data);
  // data get from api and show in table
  useEffect(() => {
    axios
      .get("http://localhost:5000/home")
      .then((res) => setData(res?.data))
      .catch((error) => console.log(error));
  }, []);
  // console.log(data);

  // data delete api call
  const handleDelete = async (id) => {
    console.log(id);
    await axios
      .delete(`http://localhost:5000/delete/${id}`)
      .then((res) => {
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div
      className="vh-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#9FE2BF" }}>
      <div className="bg-white rounded  w-50 p-3">
        <h1 className="text-center fs-1 fw-bold">List Of Users</h1>
        <div className="d-flex justify-content-end py-2">
          <Link to="/signup" className="btn btn-success">
            Add New User
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link
                      to={`/read/${user?.id}`}
                      className="btn btn-sm btn-info">
                      Read
                    </Link>
                    <Link
                      to={`/edit/${user?.id}`}
                      className="btn btn-sm btn-primary mx-2">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="btn btn-sm btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
