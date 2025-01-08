require("dotenv").config();
const src = require("./src/index");
const db = require("./src/database/dbConnect");
const initAssociations = require("./src/database/models/associations");
const { swaggerSpec, swaggerUi } = require("./src/swagger.js"); // Import Swagger

const express = require("express");
const body_parser = require("body-parser");
const helmet = require("helmet")();
const compression = require("compression")();
const cors = require("cors")();

const PORT = process.env.PORT || 3002;

const app = express();
const route = express.Router();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Serve Swagger UI at /api-docs endpoint
// Middleware setup
app.use(route);
app.use(helmet);
app.use(compression);
app.use(cors);
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

// Main entry point to the app
app.use("/api", src);

app.get("/", (req, res) => {
  return res.send("App is running");
});

initAssociations();

// Start the server after database sync
db.authenticate()
  .then(() => {
    console.log("Database connected...");
    return db.sync(); // Sync database only after connection is successful
  })
  .then(() => {
    console.log("Database synchronized successfully.");
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting or synchronizing database:", err);
  });

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something went wrong!" });
});
