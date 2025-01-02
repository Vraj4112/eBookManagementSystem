const express = require("express");
const { register, login } = require("./controller");
const { validateRegister, validateLogin } = require("./validator");

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

module.exports = router;
