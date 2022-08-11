const express = require("express");
const session = require("express-session");
const Filestore = require("session-file-store")(session);
const router = express.Router();

const app = express();

const page = require("./view/page.js");
const createToken = require("./token.js");
const verify = require("./verify.js");

// app.use(express.static(__dirname));

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: true,
    store: new Filestore(),
  })
);

app.listen(3000, () => {
  console.log(3000, "server running");
});

app.use(page);
app.use(createToken);
app.use(verify);
