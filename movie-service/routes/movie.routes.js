const express = require('express');
const router = express.Router();
const { getMovies, addMovie, getMovieById, updateMovie, deleteMovie, searchMovies, createMovie} = require('../controller/movie.controller');
const { body } = require('express-validator');
const {verifyToken } = require('../middleware/auth.middleware');
const {route} = require("express/lib/application");
const authorizeRole = require('../middleware/authorizeRole');
const upload = require("../middleware/upload.middleware");

router.post("/", upload.single("poster"), createMovie);
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
