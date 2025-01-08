const Book = require("./book");
const Category = require("./category");
const Comment = require("./comment");
const User = require("./user");

const initAssociations = () => {
  // Book - Category Many-to-Many relationship
  Book.belongsToMany(Category, { through: "BookCategory" });
  Category.belongsToMany(Book, { through: "BookCategory" });

  // Book - Comment One-to-Many relationship
  Book.hasMany(Comment, { foreignKey: "bookId" });
  Comment.belongsTo(Book, { foreignKey: "bookId" });

  // User - Book One-to-Many relationship (author)
  User.hasMany(Book, { foreignKey: "authorId" });
  Book.belongsTo(User, { foreignKey: "authorId" });

  // User - Comment One-to-Many relationship (moderator)
  User.hasMany(Comment, { foreignKey: "moderatorId" });
  Comment.belongsTo(User, { foreignKey: "moderatorId" });
};

module.exports = initAssociations;
