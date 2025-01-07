const { DataTypes } = require("sequelize");
const sequelize = require("../dbConnect.js");
const Book = require("./book.js");

const Category = sequelize.define("Category", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Associations
Category.belongsToMany(Book, { through: "BookCategory" });
Book.belongsToMany(Category, { through: "BookCategory" });

module.exports = Category;
