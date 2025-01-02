// validators/bookValidator.js
const Joi = require("joi");

const validateBook = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().optional(),
    status: Joi.string().valid("Draft", "Published").optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

module.exports = { validateBook };
