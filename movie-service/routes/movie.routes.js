const express = require('express');
const router = express.Router();
const { getMovies, addMovie } = require('../controller/movie.controller');
const { body } = require('express-validator');

router.get('/health', (req, res)=>{
    res.send("movie service /api/movies/health is good");
});
router.get('/', getMovies);

router.post('/',
    [
        body('title').notEmpty().withMessage('Title is required')
    ],
    addMovie
);

module.exports = router;
