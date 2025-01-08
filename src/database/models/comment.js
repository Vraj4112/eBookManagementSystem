const { DataTypes } = require("sequelize");
const sequelize = require("../dbConnect.js");
const Book = require("./book.js");
const User = require("./user.js");

const Comment = sequelize.define(
  "Comment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "approved"),
      defaultValue: "pending",
    },
  },
  { timestamps: true } // Enable automatic creation of 'createdAt' and 'updatedAt'
);

module.exports = Comment;
