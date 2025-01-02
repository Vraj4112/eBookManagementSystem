const { DataTypes } = require("sequelize");
const sequelize = require("../dbConnect");

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Category;
