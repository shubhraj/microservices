const Movie = require('../models/movie.model');
const { validationResult } = require('express-validator');
const Review = require('../models/review.model');
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

exports.searchMovies = async (req, res) => {
    try {
        const { title, genre, year, page = 1, limit = 10, sort } = req.query;

        const query = {};

        if (title) {
            query.title = { $regex: new RegExp(title, 'i') };
        }

        if (genre) {
            query.genre = { $regex: new RegExp(genre, 'i') };
        }

        if (year) {
            query.year = Number(year);
        }

        const skip = (page - 1) * limit;

        // Prepare sort options
        let sortOptions = {};
        if (sort) {
            const sortField = sort.startsWith('-') ? sort.slice(1) : sort;
            const sortOrder = sort.startsWith('-') ? -1 : 1;
            sortOptions[sortField] = sortOrder;
        }

        const movies = await Movie.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(Number(limit));

        const total = await Movie.countDocuments(query);

        res.json({
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit),
            results: movies,
        });
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ message: 'Search failed' });
    }
};

exports.createMovie = async (req, res) => {
    try {
        const { title, genre, year } = req.body;
        const posterPath = req.file ? req.file.path : null;

        const newMovie = new Movie({
            title,
            genre,
            year,
            poster: posterPath, // store relative path to DB
        });

        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.movieReviews =  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { movieId } = req.params;
    const { rating, comment } = req.body;

    try {
        const review = new Review({
            movieId,
            userId: req.user.userId,
            rating,
            comment,
        });

        await review.save();
        res.status(201).json(review);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
};