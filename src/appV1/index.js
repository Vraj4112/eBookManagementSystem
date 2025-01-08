const express = require("express");
const app = express();

const user_auth = require("./user/routes");
const books = require("./book/routes");
const category = require("./category/routes");
const comments = require("./comment/routes");

app.use("/user", user_auth);
app.use("/books", books);
app.use("/category", category);
app.use("/comments", comments);

module.exports = app;
