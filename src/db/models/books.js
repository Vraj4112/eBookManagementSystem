const { DataTypes } = require("sequelize");
const sequelize = require("../dbConnect");
const User = require("./user");

const Book = sequelize.define(
  "Book",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Draft", "Published"),
      defaultValue: "Draft",
    },
  },
  {
    timestamps: true,
  }
);

Book.belongsTo(User, { foreignKey: "authorId" });
module.exports = Book;
