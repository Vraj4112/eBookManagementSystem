const express = require("express");
const router = express.Router();
const jwt_sign_token = require("../../utilities/jwt-auth").signToken;
const { validateRegister, validateLogin } = require("./validator");

router.post("/auth/register", validateRegister);
router.post("/auth/login", jwt_sign_token, validateLogin);

module.exports = router;
