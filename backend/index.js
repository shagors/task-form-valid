import express, { json } from "express";
import { createConnection } from "mysql";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
app.use(json());
app.use(cors());

// jwt middleware make for secure

const verifyJwt = (req, res, next) => {
  const token = req.headers["access-token"];
  if (!token) {
    return res.json("You are not authorized person");
  } else {
    jwt.verify(token, "jwtSecretKey", (error, decode) => {
      if (error) {
        res.json("Not Authonticated");
      } else {
        req.userId = decode.id;
        next();
      }
    });
  }
};

// create db connection with mysql

const db = createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "form",
});

// data make to server api

app.post("/signup", (req, res) => {
  const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
  const values = [req.body.name, req.body.email, req.body.password];
  db.query(sql, [values], (error, data) => {
    if (error) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

// check jwt token pass to local storage

app.get("/checkauth", verifyJwt, (req, res) => {
  return res.json("Authen");
});

// data send to frontend api

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
  db.query(sql, [req.body.email, req.body.password], (error, data) => {
    if (error) {
      return res.json("Error");
    }
    if (data.length > 0) {
      const id = data[0].id;
      const token = jwt.sign({ id }, "jwtSecretKey", {
        expiresIn: 300,
      });
      return res.json({ Login: true, token, data });
    } else {
      return res.json("Failed");
    }
  });
});

// data send to frontend and show data api

app.get("/home", (req, res) => {
  const sql = "SELECT * FROM login";
  db.query(sql, (error, result) => {
    if (error) return res.json({ Message: "Something wrong Occured" });
    return res.json(result);
  });
});

// single id read and show api

app.get("/read/:id", (req, res) => {
  const sql = "SELECT * FROM login WHERE id = ?";
  const id = req.params.id;
  db.query(sql, [id], (error, result) => {
    if (error) return res.json({ Message: "Something wrong Occured" });
    return res.json(result);
  });
});

// Update api user data update

app.put("/update/:id", (req, res) => {
  const sql = "UPDATE login SET `name` = ? , `email` = ? WHERE id=?";
  const id = req.params.id;
  db.query(sql, [req.body.name, req.body.email, id], (error, result) => {
    if (error) return res.json({ Message: "Something wrong Occured" });
    return res.json(result);
  });
});

// Delete api for user delete
app.delete("/delete/:id", (req, res) => {
  const sql = "DELETE FROM login WHERE id = ?";
  const id = req.params.id;
  db.query(sql, [id], (error, result) => {
    if (error) return res.json({ Message: "Something wrong Occured" });
    return res.json(result);
  });
});

// for test

app.listen(5000, () => {
  console.log("Port is connected");
});
