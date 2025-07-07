// routes/auth.routes.js
const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth.controller");
const {body} = require('express-validator');
const {authRateLimiter} = require("../middleware/rateLimiter.middleware");
router.post("/register", authRateLimiter,
    [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Enter Valid Email"),
    body("password").isLength({min: 6}).withMessage("Password must be at least 6 characters")
] ,register);
router.post("/login",authRateLimiter,
    [
        body("email").isEmail().withMessage("Enter a valid email"),
        body("password").notEmpty().withMessage("Password is required")
    ],
    login);

module.exports = router;
