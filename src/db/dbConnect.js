const mysql = require("mysql2");
const { stack } = require("../appV1/Books/routes");

const localconfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DATABASE,
};

function dbConnection() {
  const dbConnect = mysql.createConnection(localconfig);
  dbConnect.connect((err) => {
    if (err) {
      console.log(err.stack, "db connection error");
    } else {
      console.log("db connection success as id", dbConnect.threadId);
    }
  });
  return dbConnect;
}
// --------------------------------------------------------
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

module.exports = sequelize;
