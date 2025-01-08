const Joi = require("joi");

const validateCreateBook = (req, res, next) => {
  const createBookValidator = Joi.object({
    title: Joi.string().min(3).max(255).required().messages({
      "string.base": `"title" should be a type of 'text'`,
      "string.empty": `"title" cannot be an empty field`,
      "string.min": `"title" should have a minimum length of 3`,
      "string.max": `"title" should have a maximum length of 255`,
      "any.required": `"title" is a required field`,
    }),
    description: Joi.string().min(10).required().messages({
      "string.base": `"description" should be a type of 'text'`,
      "string.empty": `"description" cannot be an empty field`,
      "string.min": `"description" should have a minimum length of 10`,
      "any.required": `"description" is a required field`,
    }),
    status: Joi.string().valid("draft", "published").optional(),
  });

  const { error } = createBookValidator.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const validateUpdateBook = (req, res, next) => {
  const updateBookValidator = Joi.object({
    title: Joi.string().min(3).max(255).optional().messages({
      "string.base": `"title" should be a type of 'text'`,
      "string.empty": `"title" cannot be an empty field`,
      "string.min": `"title" should have a minimum length of 3`,
      "string.max": `"title" should have a maximum length of 255`,
    }),
    description: Joi.string().min(10).optional().messages({
      "string.base": `"description" should be a type of 'text'`,
      "string.empty": `"description" cannot be an empty field`,
      "string.min": `"description" should have a minimum length of 10`,
    }),
    status: Joi.string().valid("draft", "published").optional(),
  });

  const { error } = updateBookValidator.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const validateDeleteBook = (req, res, next) => {
  const deleteBookValidator = Joi.object({
    id: Joi.number().integer().positive().required().messages({
      "number.base": `"id" should be a type of 'integer'`,
      "any.required": `"id" is a required field`,
    }),
  });

  const { error } = deleteBookValidator.validate(req.params);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const validateGetBookById = (req, res, next) => {
  const getBookByIdValidator = Joi.object({
    id: Joi.number().integer().positive().required().messages({
      "number.base": `"id" should be a type of 'integer'`,
      "any.required": `"id" is a required field`,
    }),
  });

  const { error } = getBookByIdValidator.validate(req.params);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = {
  validateCreateBook,
  validateUpdateBook,
  validateDeleteBook,
  validateGetBookById,
};
