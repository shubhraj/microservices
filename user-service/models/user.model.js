// user-service/models/user.model.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email:    { type: String, required: true, unique: true },
    password: {type:String, required: true},
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    profilePic: String,
    preferences: {
        genres: [String],
        language: String
    }
});

module.exports = mongoose.model("User", userSchema);
