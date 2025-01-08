const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

/**
 * Swagger Definition
 */
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "eBook Management API",
    version: "1.0.0",
    description: "API documentation for eBook Management System",
    contact: {
      name: "vraj patel",
      email: "vrajpatel.dev02@gmail.com",
    },
  },
  servers: [
    {
      url: "http://localhost:3002/api",
      description: "Local server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"], // Path to the API docs, adjust accordingly
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec, swaggerUi };
