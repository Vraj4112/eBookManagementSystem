require("dotenv").config();
const src = require("./src/index");
const db = require("./src/database/dbConnect");
const Book = require("./src/database/models/book");

const express = require("express");
const body_parser = require("body-parser");
const helmet = require("helmet")();
const compression = require("compression")();
const cors = require("cors")();

const PORT = process.env.PORT || 3002;
//global.sql = dbConnect();

db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.error("Error connecting to the database:", err));
db.sync()
  .then(() => console.log("Database synchronized successfully."))
  .catch((err) => console.error("Error synchronizing data:", err));

const app = express();
const route = express.Router();

app.use(route);
app.use(helmet);
app.use(compression);
app.use(cors);
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

app.use("/api", src); // Main entry point to the app -------------------

app.get("/", (req, res) => {
  return res.send("app running");
});

app.listen(PORT, () => {
  console.log(`Server listening on port${PORT}`);
});
