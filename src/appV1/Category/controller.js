// controllers/categoryController.js
const Category = require("../../database/models/category");

// Create a new category
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });
    return res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating category", error: error.message });
  }
};

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.status(200).json({ categories });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching categories", error: error.message });
  }
};

// Get category by id
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({ category });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching category", error: error.message });
  }
};

// Update category by id
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.name = name || category.name;
    await category.save();

    return res
      .status(200)
      .json({ message: "Category updated successfully", category });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating category", error: error.message });
  }
};

// Delete category by id
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.destroy();

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting category", error: error.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
