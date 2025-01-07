const { DataTypes } = require("sequelize");
const sequelize = require("../dbConnect.js");
const Book = require("./book.js");
const Comment = require("./comment.js");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("reader", "author"),
    defaultValue: "reader",
  },
});

// Associations
User.hasMany(Book, { foreignKey: "authorId" });
Book.belongsTo(User, { foreignKey: "authorId" });

User.hasMany(Comment, { foreignKey: "moderatorId" });
Comment.belongsTo(User, { foreignKey: "moderatorId" });

module.exports = User;
