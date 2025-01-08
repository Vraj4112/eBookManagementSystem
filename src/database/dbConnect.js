const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE || "ebook_portal",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "123456",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    dialectOptions: {
      multipleStatements: true,
      insecureAuth: true,
    },
    //logging: console.log,
    define: {
      charset: "utf8mb4",
    },
  }
);

module.exports = sequelize;
// --------------------------------------------------------
// const mysql = require("mysql2");

// const localconfig = {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
//   database: process.env.DATABASE,
// };

// function dbConnection() {
//   const dbConnect = mysql.createConnection(localconfig);
//   dbConnect.connect((err) => {
//     if (err) {
//       console.log(err.stack, "db connection error");
//     } else {
//       console.log("db connection success as id", dbConnect.threadId);
//     }
//   });
//   return dbConnect;
// }
