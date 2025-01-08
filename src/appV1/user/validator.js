const Joi = require("joi");

const validateRegister = (req, res, next) => {
  const registerValidator = Joi.object({
    username: Joi.string().min(3).max(255).required().messages({
      "string.base": `"username" should be a type of 'text'`,
      "string.empty": `"username" cannot be an empty field`,
      "string.min": `"username" should have a minimum length of 3`,
      "string.max": `"username" should have a maximum length of 255`,
      "any.required": `"username" is a required field`,
    }),
    email: Joi.string().email().required().messages({
      "string.base": `"email" should be a type of 'email'`,
      "string.empty": `"email" cannot be an empty field`,
      "string.email": `"email" should be a valid email`,
      "any.required": `"email" is a required field`,
    }),
    password: Joi.string().min(6).required().messages({
      "string.base": `"password" should be a type of 'text'`,
      "string.empty": `"password" cannot be an empty field`,
      "string.min": `"password" should have a minimum length of 6`,
      "any.required": `"password" is a required field`,
    }),
  });

  const { error } = registerValidator.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const validateLogin = (req, res, next) => {
  const loginValidator = Joi.object({
    email: Joi.string().email().required().messages({
      "string.base": `"email" should be a type of 'email'`,
      "string.empty": `"email" cannot be an empty field`,
      "string.email": `"email" should be a valid email`,
      "any.required": `"email" is a required field`,
    }),
    password: Joi.string().min(6).required().messages({
      "string.base": `"password" should be a type of 'text'`,
      "string.empty": `"password" cannot be an empty field`,
      "string.min": `"password" should have a minimum length of 6`,
      "any.required": `"password" is a required field`,
    }),
  });

  const { error } = loginValidator.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = {
  validateRegister,
  validateLogin,
};
