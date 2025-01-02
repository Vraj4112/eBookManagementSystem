const { DataTypes } = require("sequelize");
const sequelize = require("../dbConnect");
const User = require("./user");
const Book = require("./books");

const Comment = sequelize.define(
  "Comment",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Pending", "Approved", "Rejected"),
      defaultValue: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

Comment.belongsTo(User, { foreignKey: "userId" });
Comment.belongsTo(Book, { foreignKey: "bookId" });
module.exports = Comment;
