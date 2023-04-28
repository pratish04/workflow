const express = require("express");
const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
  host: "bn5al3w0zspico0ivrt5-mysql.services.clever-cloud.com",
  user: "ufjyfc29cnzsnhvt",
  password: "1lGJaFU7IFwVUJDrRUGD",
  database: "bn5al3w0zspico0ivrt5",
  multipleStatements: true,
});

module.exports = connection;
