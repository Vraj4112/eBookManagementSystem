const express = require("express");
const app = express();
const user = require("./Users/routes");
const library = require("./Books/routes");

app.use("/user", user);
app.use("/library", library);

module.exports = app;
