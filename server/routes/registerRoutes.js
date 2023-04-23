const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

const db = require("../database/connection");

const registerQueryPromise1 = (req) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM users WHERE email=?;",
      [req.body.email],
      (error, result) => {
        if (error) {
          return reject(error);
        } else if (result.length !== 0) {
          return reject({ emailAlreadyInUse: true });
        } else {
          return resolve(result);
        }
      }
    );
  });
};

const registerQueryPromise2 = (req) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) return reject(err);
      else {
        db.query(
          "INSERT INTO users (firstName, lastName, email, password) VALUES(?, ?, ?, ?);",
          [req.body.firstName, req.body.lastName, req.body.email, hash],
          (error, results) => {
            if (error) {
              return reject(error);
            } else {
              return resolve(results);
            }
          }
        );
      }
    });
  });
};

const registerQueryPromise3 = (req) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT userId FROM users WHERE email=?;",
      [req.body.email],
      (error, results) => {
        if (error) {
          return reject(error);
        } else {
          return resolve(results);
        }
      }
    );
  });
};

router.post("/", async (req, res) => {
  try {
    const result1 = await registerQueryPromise1(req);
    const result2 = await registerQueryPromise2(req);
    const result3 = await registerQueryPromise3(req);
    const token = jwt.sign(
      { userId: result3[0].userId },
      process.env.ACCESS_TOKEN_SECRET
    );
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .send({
        registrationSuccessful: true,
        message: "USER REGISTRATION SUCCESSFUL!",
      });
    console.log("USER REGISTRATION SUCCESSFUL!");
  } catch {
    console.log("USER REGISTRATION FAILURE!");
    res.send({ message: "USER REGISTRATION FAILURE!" });
  }
});

module.exports = router;
