const Joi = require("joi");

const validateCreateComment = (req, res, next) => {
  const createCommentValidator = Joi.object({
    content: Joi.string().min(10).required().messages({
      "string.base": `"content" should be a type of 'text'`,
      "string.empty": `"content" cannot be an empty field`,
      "string.min": `"content" should have a minimum length of 10`,
      "any.required": `"content" is a required field`,
    }),
    status: Joi.string().valid("pending", "approved").optional(),
  });

  const { error } = createCommentValidator.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const validateUpdateCommentStatus = (req, res, next) => {
  const updateCommentStatusValidator = Joi.object({
    status: Joi.string().valid("pending", "approved").required().messages({
      "string.base": `"status" should be a type of 'string'`,
      "any.required": `"status" is a required field`,
    }),
  });

  const { error } = updateCommentStatusValidator.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const validateDeleteComment = (req, res, next) => {
  const deleteCommentValidator = Joi.object({
    id: Joi.number().integer().positive().required().messages({
      "number.base": `"id" should be a type of 'integer'`,
      "any.required": `"id" is a required field`,
    }),
  });

  const { error } = deleteCommentValidator.validate(req.params);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const validateGetCommentById = (req, res, next) => {
  const getCommentByIdValidator = Joi.object({
    bookId: Joi.number().integer().positive().required().messages({
      "number.base": `"bookId" should be a type of 'integer'`,
      "any.required": `"bookId" is a required field`,
    }),
    id: Joi.number().integer().positive().required().messages({
      "number.base": `"id" should be a type of 'integer'`,
      "any.required": `"id" is a required field`,
    }),
  });

  const { error } = getCommentByIdValidator.validate(req.params);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = {
  validateCreateComment,
  validateUpdateCommentStatus,
  validateDeleteComment,
  validateGetCommentById,
};
