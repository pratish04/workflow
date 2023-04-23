const express = require("express");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const authorization = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      res.send({ noToken: true, message: "User unauthenticated!" });
    } else {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          console.log("Error while verifying token!");
          res.send({
            tokenInvalid: true,
            message: "Invalid token! Kindly reauthenticate!",
          });
        } else {
          req.data = { userId: decoded.userId };
          next();
        }
      });
    }
  } catch {
    console.log("Some error occurred!");
  }
};

module.exports = authorization;
