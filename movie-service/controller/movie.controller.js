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

exports.getMovieById = async (req, res) => {
    try {
        const movie = await  Movie.find({title: req.params.id});
        if(!movie) res.status(404).json({error: "Movie Not Found"});
        res.json(movie);
    } catch (e){
        res.status(400).json({error: "Invalid Id"});
    }
}

exports.deleteMovie = async (req, res) => {
   try{
       const deleted = await Movie.findByIdAndDelete(req.params.id);
       if(!deleted) return res.status(404).json({error: "Movie Not Found"});
       res.json({message: "Movie Deleted Successfully!"});
   } catch (e) {
       res.status(400).json({error: "Invalid ID"});
   }
}

exports.updateMovie = async (req, res) => {
    try {
        const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true});
        if(!updated) return res.status(400).json({error: 'Movie Not Found'});
        res.json(updated);
    } catch (e) {
        res.status(400).json({error: 'Invalid Data'});
    }
}
