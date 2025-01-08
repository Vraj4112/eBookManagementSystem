const Comment = require("../../database/models/comment");
const Book = require("../../database/models/book");
const User = require("../../database/models/user");

// Controller for creating a comment on a book
const createComment = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { content } = req.body;
    const { userId } = req.user; // Assuming the userId is available after JWT verification

    // Check if the book exists
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Create the comment
    const newComment = await Comment.create({
      content,
      bookId,
      moderatorId: userId, // The user who is creating the comment
    });

    return res.status(201).json(newComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    return res.status(500).json({ message: "Error creating comment" });
  }
};

// Controller for getting all comments for a book
const getCommentsByBookId = async (req, res) => {
  try {
    const { bookId } = req.params;

    // Fetch comments for the specific book
    const comments = await Comment.findAll({
      where: { bookId },
      include: [User], // Optionally include User data for the moderator
    });

    if (comments.length === 0) {
      return res
        .status(404)
        .json({ message: "No comments found for this book" });
    }

    return res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return res.status(500).json({ message: "Error fetching comments" });
  }
};

// Controller for updating a comment's status to 'approved'
const updateCommentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Check if status is valid
    if (!["pending", "approved"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Find the comment by its ID
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Update the comment status
    comment.status = status;
    await comment.save();

    return res.status(200).json(comment);
  } catch (error) {
    console.error("Error updating comment status:", error);
    return res.status(500).json({ message: "Error updating comment status" });
  }
};

// Controller for deleting a comment
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the comment by its ID
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Delete the comment
    await comment.destroy();

    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return res.status(500).json({ message: "Error deleting comment" });
  }
};

module.exports = {
  createComment,
  getCommentsByBookId,
  updateCommentStatus,
  deleteComment,
};
