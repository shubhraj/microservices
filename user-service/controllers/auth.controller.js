// controllers/auth.controller.js
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {validationResult} = require("express-validator");
const logger = require("../utils/logger");
const {loggers} = require("winston");


const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    try {
        const { username, email, password } = req.body;

        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ error: "User already exists" });

        const hashedPwd = await bcrypt.hash(password, 10);

        const user = await User.create({ username, email, password: hashedPwd });

        res.status(201).json({ message: "User registered", userId: user._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        logger.warn("Validation failed during login", { errors: errors.array() });
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            logger.warn(`Login failed: email not found - ${email}`);
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            logger.warn(`Login failed: incorrect password for ${email}`);
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });
        logger.info(`Login successful for user ${email}`);

        res.json({ message: "Login successful", token });
    } catch (err) {
        logger.error("Login error", err);
        res.status(500).json({ error: err.message });
    }
};
