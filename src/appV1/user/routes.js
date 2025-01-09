const express = require("express");
const router = express.Router();
const validator = require("./validator");
const controller = require("./controller");

router.post("/register", validator.validateRegister, controller.registerUser);
router.post("/login", validator.validateLogin, controller.loginUser);

module.exports = router;
