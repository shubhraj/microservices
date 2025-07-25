const express = require('express');
const router = express.Router();
const { getMovies, addMovie } = require('../controller/movie.controller');
const { body } = require('express-validator');
const {verifyToken } = require('../middleware/auth.middleware');

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

module.exports = router;
