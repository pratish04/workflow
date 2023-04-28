const express = require("express");
const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
  host: "bn5al3w0zspico0ivrt5-mysql.services.clever-cloud.com",
  user: "ufjyfc29cnzsnhvt",
  password: process.env.DATABASE_PASSWORD,
  database: "bn5al3w0zspico0ivrt5",
  multipleStatements: true,
});

module.exports = connection;
