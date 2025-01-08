const { DataTypes } = require("sequelize");
const sequelize = require("../dbConnect.js");
const Category = require("./category.js");
const Comment = require("./comment.js");

const Book = sequelize.define(
  "Book",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("draft", "published"),
      defaultValue: "draft",
    },
  },
  { timestamps: true }
);

module.exports = Book;
