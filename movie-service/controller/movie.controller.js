const Movie = require('../models/movie.model');
const { validationResult } = require('express-validator');

exports.getMovies = async (req, res) => {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
};

exports.addMovie = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
};
