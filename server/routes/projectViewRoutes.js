const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
require("dotenv").config();

const authorization = require("../middlewares/authorization");

const db = require("../database/connection.js");

router.get("/", authorization, (req, res) => {
  try {
    db.query(
      "SELECT userId AS value, CONCAT(firstName, ' ', lastName) AS label FROM users WHERE userId!=? ORDER BY label; SELECT * FROM project_log INNER JOIN projects WHERE (project_log.projectMemberId=? AND project_log.projectId=projects.projectId);",
      [req.query.userId, req.query.userId],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send({ result: result, userId: req.data.userId });
        }
      }
    );
  } catch {
    console.log("SOME CATCH IN TEAMS GET!");
  }
});

module.exports = router;
