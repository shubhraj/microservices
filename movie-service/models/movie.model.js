const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
    title: {type: String, require: true},
    genre: String,
    releaseYear: Number,
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Movie', movieSchema);