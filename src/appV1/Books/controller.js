const Book = require("../models/Book");

const createBook = async (req, res) => {
  try {
    const { title, content, status } = req.body;
    const book = await Book.create({ ...req.body, authorId: req.user.id });
    res.status(201).json({ message: "Book created successfully", book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    if (book.authorId !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await book.update(req.body);
    res.status(200).json({ message: "Book updated successfully", book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    if (book.authorId !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await book.destroy();
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createBook, updateBook, deleteBook, getBooks };
