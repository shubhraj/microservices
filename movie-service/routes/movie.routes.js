const express = require('express');
const router = express.Router();
const { getMovies, addMovie, getMovieById, updateMovie, deleteMovie, searchMovies, createMovie, movieReviews} = require('../controller/movie.controller');
const { body } = require('express-validator');
const {verifyToken } = require('../middleware/auth.middleware');
const {route} = require("express/lib/application");
const authorizeRole = require('../middleware/authorizeRole');
const upload = require("../middleware/upload.middleware");
const Review = require('../models/review.model');


router.post("/", upload.single("poster"), createMovie);

router.post("/:movieId/reviews",
    verifyToken,
    [
        body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be 1 to 5'),
        body('comment').optional().isString(),
    ],
    movieReviews
);

router.get('/health', (req, res)=>{
    console.log("request is here : " +req);
    res.send("movie service /api/movies/health is good");
});

router.get('/', getMovies);

router.post('/',
     verifyToken,
    [
        body('title').notEmpty().withMessage('Title is required')
    ],
    addMovie
);

router.get('/:id', getMovieById);

router.put('/:id', verifyToken ,authorizeRole('admin'), updateMovie);

router.delete('/:id',verifyToken ,authorizeRole('admin') , deleteMovie);

router.get('/search', searchMovies);

module.exports = router;
