const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const path = require("path");

const app = express();
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const movieRoutes = require('./routes/movie.routes');
app.use(express.json());
app.use('/api/movies', movieRoutes);

app.get('/', (req, res) => res.send('🎬 Movie Service Running'));

const PORT = process.env.PORT || 5002;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => console.log(`🎬 Movie Service running on port ${PORT}`));
    })
    .catch(err => console.error(err));
