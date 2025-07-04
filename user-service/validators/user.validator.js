const { body } = require("express-validator");

exports.validateProfileUpdate = [
    body("username").optional().isString().notEmpty().withMessage("Username must be a non-empty string"),
    body("profilePic").optional().isURL().withMessage("Profile picture must be a valid URL"),

    body("preferences.genres")
        .optional()
        .isArray({ min: 1 }).withMessage("Genres must be an array of strings")
        .custom((arr) => arr.every(item => typeof item === "string")).withMessage("Each genre must be a string"),

    body("preferences.language")
        .optional()
        .isString().withMessage("Language must be a string")
];
