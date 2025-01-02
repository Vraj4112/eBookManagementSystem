const express = require("express");
const app = express();
const version1 = require("./appV1/routes");

app.use("/v1", version1);

module.exports = app;
