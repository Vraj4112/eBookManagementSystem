const Joi = require("joi");

// Validation for creating a category
const validateCreateCategory = (req, res, next) => {
  const createCategoryValidator = Joi.object({
    name: Joi.string().min(3).max(255).required().messages({
      "string.base": `"name" should be a type of 'text'`,
      "string.empty": `"name" cannot be an empty field`,
      "string.min": `"name" should have a minimum length of 3`,
      "string.max": `"name" should have a maximum length of 255`,
      "any.required": `"name" is a required field`,
    }),
  });

  const { error } = createCategoryValidator.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// Validation for updating a category
const validateUpdateCategory = (req, res, next) => {
  const updateCategoryValidator = Joi.object({
    name: Joi.string().min(3).max(255).optional().messages({
      "string.base": `"name" should be a type of 'text'`,
      "string.empty": `"name" cannot be an empty field`,
      "string.min": `"name" should have a minimum length of 3`,
      "string.max": `"name" should have a maximum length of 255`,
    }),
  });

  const { error } = updateCategoryValidator.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// Validation for deleting a category
const validateDeleteCategory = (req, res, next) => {
  const deleteCategoryValidator = Joi.object({
    id: Joi.number().integer().positive().required().messages({
      "number.base": `"id" should be a type of 'integer'`,
      "any.required": `"id" is a required field`,
    }),
  });

  const { error } = deleteCategoryValidator.validate(req.params);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// Validation for getting category by id
const validateGetCategoryById = (req, res, next) => {
  const getCategoryByIdValidator = Joi.object({
    id: Joi.number().integer().positive().required().messages({
      "number.base": `"id" should be a type of 'integer'`,
      "any.required": `"id" is a required field`,
    }),
  });

  const { error } = getCategoryByIdValidator.validate(req.params);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = {
  validateCreateCategory,
  validateUpdateCategory,
  validateDeleteCategory,
  validateGetCategoryById,
};
