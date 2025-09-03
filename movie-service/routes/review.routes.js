const express = require('express');
const { body, validationResult } = require('express-validator');
const {verifyToken } = require('../middleware/auth.middleware');
const Review = require('../models/review.model');

const router = express.Router();

// POST /api/movies/:movieId/reviews
router.post(
    '/:movieId/reviews',
    verifyToken,
    [
        body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be 1 to 5'),
        body('comment').optional().isString(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { movieId } = req.params;
        const { rating, comment } = req.body;

        try {
            const review = new Review({
                movieId,
                userId: req.user.id,
                rating,
                comment,
            });

            await review.save();
            res.status(201).json(review);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Server error' });
        }
    }
);

module.exports = router;
