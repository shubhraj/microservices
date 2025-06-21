const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
    logger.error("Unhandled Error", err);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        error: message
    });
}

module.exports = errorHandler;