const express = require("express");
const fs = require("fs");
const router = express.Router();

router.get("/", (req, res) => {
  fs.readFile("view/page1.html", "utf-8", (err, data) => {
    res.send(data);
  });
});

module.exports = router;
