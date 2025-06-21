// controllers/auth.controller.js
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {validationResult} = require("express-validator");
const logger = require("../utils/logger");


const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

exports.register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

        const { username, email, password } = req.body;
        const exists = await User.findOne({ email });
        if (exists) {
            const err = new Error("User already exists");
            err.statusCode = 400;
            return next(err);
        }

        const hashedPwd = await bcrypt.hash(password, 10);

        const user = await User.create({ username, email, password: hashedPwd });

        res.status(201).json({ message: "User registered", userId: user._id });

};

exports.login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        logger.warn("Validation failed during login", { errors: errors.array() });
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        const err = new Error("Invalid credentials for login");
        err.statusCode = 401;
        return next(err);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        const err = new Error("Invalid credentials");
        err.statusCode = 401;
        return next(err);
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });
    logger.info(`Login successful for user ${email}`);

    res.json({ message: "Login successful", token });

};
