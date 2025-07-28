const express = require('express');
const router = express.Router();
const { getMovies, addMovie, getMovieById, updateMovie, deleteMovie } = require('../controller/movie.controller');
const { body } = require('express-validator');
const {verifyToken } = require('../middleware/auth.middleware');
const {route} = require("express/lib/application");
const authorizeRole = require('../middleware/authorizeRole');

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

router.put('/:id', updateMovie);

router.delete('/:id',verifyToken ,authorizeRole('admin') , deleteMovie);

module.exports = router;
