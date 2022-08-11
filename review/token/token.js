const express = require("express");
const router = express.Router();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const dot = require("dotenv");

dot.config();

const key = process.env.KEY;

router.post("/login", (req, res) => {
  const name = "huni";
  let token = jwt.sign(
    {
      type: "JWT",
      name,
    },
    key,
    {
      expiresIn: "5m",
      issuer: "me",
    }
  );
  req.session.token = token;
  fs.readFile("view/page2.html", "utf-8", (err, data) => {
    res.send(data);
  });
});

module.exports = router;
