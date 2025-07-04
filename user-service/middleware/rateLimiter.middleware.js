const rateLimit = require("express-rate-limit");

const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    message: {
        success: false,
        error: "Too many attempts. Please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false
});

module.exports = {
    authRateLimiter
};
