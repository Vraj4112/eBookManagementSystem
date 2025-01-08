// controllers/bookController.js
const Book = require("../../database/models/book");
const Category = require("../../database/models/category");
const Comment = require("../../database/models/comment");

const createBook = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const newBook = await Book.create({ title, description, status });
    res.status(201).json({
      message: "Book created successfully",
      book: newBook,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating book",
      error: error.message,
    });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching books",
      error: error.message,
    });
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id, {
      include: [{ model: Category }, { model: Comment }],
    });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching book by ID",
      error: error.message,
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.title = title || book.title;
    book.description = description || book.description;
    book.status = status || book.status;

    await book.save();
    res.status(200).json({
      message: "Book updated successfully",
      book,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating book",
      error: error.message,
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await book.destroy();
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting book",
      error: error.message,
    });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
