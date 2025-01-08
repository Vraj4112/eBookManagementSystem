// Middleware to check if the user is an Author
const isAuthor = (req, res, next) => {
  if (req.user.role !== "Author") {
    return res
      .status(403)
      .json({ message: "Access denied, only authors allowed" });
  }
  next();
};

// Middleware to check if the user is a Reader
const isReader = (req, res, next) => {
  if (req.user.role !== "Reader") {
    return res
      .status(403)
      .json({ message: "Access denied, only readers allowed" });
  }
  next();
};
module.exports = {
  isAuthor,
  isReader,
};