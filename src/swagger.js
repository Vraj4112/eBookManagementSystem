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
      url: "http://localhost:3002/api/v1", // Base URL for your API
      description: "Local server with versioning",
    },
  ],
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          username: { type: "string", example: "JohnDoe" },
          email: { type: "string", example: "john.doe@example.com" },
          role: {
            type: "string",
            enum: ["reader", "author"],
            example: "author",
          },
        },
        required: ["username", "email"],
      },
      UserRegistration: {
        type: "object",
        properties: {
          username: { type: "string", example: "JohnDoe" },
          email: { type: "string", example: "john.doe@example.com" },
          password: { type: "string", example: "securepassword123" },
        },
        required: ["username", "email", "password"],
      },
      UserLogin: {
        type: "object",
        properties: {
          email: { type: "string", example: "john.doe@example.com" },
          password: { type: "string", example: "securepassword123" },
        },
        required: ["email", "password"],
      },
      Book: {
        type: "object",
        properties: {
          id: { type: "integer", example: 101 },
          title: { type: "string", example: "The Great Gatsby" },
          description: {
            type: "string",
            example: "A novel by F. Scott Fitzgerald",
          },
          status: {
            type: "string",
            enum: ["draft", "published"],
            example: "published",
          },
        },
        required: ["title", "description"],
      },
      Category: {
        type: "object",
        properties: {
          id: { type: "integer", example: 10 },
          name: { type: "string", example: "Fiction" },
        },
        required: ["name"],
      },
      Comment: {
        type: "object",
        properties: {
          id: { type: "integer", example: 201 },
          content: { type: "string", example: "Great book!" },
          status: {
            type: "string",
            enum: ["approved", "pending"],
            example: "approved",
          },
          bookId: { type: "integer", example: 101 },
          userId: { type: "integer", example: 1 },
        },
        required: ["content", "status", "bookId", "userId"],
      },
    },
  },
  paths: {
    "/user/register": {
      post: {
        summary: "Register a new user",
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UserRegistration" },
            },
          },
        },
        responses: {
          201: {
            description: "User successfully registered",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
        },
      },
    },
    "/user/login": {
      post: {
        summary: "User login",
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UserLogin" },
            },
          },
        },
        responses: {
          200: {
            description: "User successfully logged in",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: { type: "string", example: "jwt_token_here" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

// Swagger options
const options = {
  swaggerDefinition,
  // apis: [
  //   "./src/appV1/book/routes.js", // Include all route files
  //   "./src/appV1/category/routes.js",
  //   "./src/appV1/comment/routes.js",
  //   "./src/appV1/user/routes.js",
  // ],
  apis: ["./src/appV1/**/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger docs available at http://localhost:3002/api-docs");
};

module.exports = setupSwaggerDocs;
