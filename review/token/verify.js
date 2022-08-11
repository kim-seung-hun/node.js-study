const express = require("express");
const router = express.Router();
const dot = require("dotenv");
const jwt = require("jsonwebtoken");

dot.config();

const key = process.env.KEY;

router.post("/userView", (req, res) => {
  const token = req.session.token;
  jwt.verify(token, key, (err, decoded) => {
    if (err) {
      console.log("잘못된 토큰 정보입니다.");
    }
    console.log(decoded);
    res.send(decoded);
  });
});

module.exports = router;
