// user-service/controllers/user.controller.js
const User = require("../models/user.model");
const {Error} = require("mongoose");
const { validationResult } = require("express-validator");

exports.createUser = async (req, res, next) => {
    const user = await User.create(req.body);
    res.status(201).json(user);
};

exports.getAllUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

exports.getMyProfile = async (req, res, next) => {
        const user = await User.findById(req.user.userId).select("-password");
        //.select("-password") omits the password from response
        if(!user){
            const err = new Error("User Not Found");
            err.statusCode = 404;
            return next(err);
        }

        res.json(user);
}

exports.updateMyProfile = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    const updates = req.body;

    const allowedFields = ["username", "profilePic", "preferences"];
    const updateKeys = Object.keys(updates);

    const isValid = updateKeys.every((key) => allowedFields.includes(key));
    if (!isValid) {
        const err = new Error("Invalid fields in request");
        err.statusCode = 400;
        return next(err);
    }

    const user = await User.findByIdAndUpdate(
        req.user.userId,
        { $set: updates },
        { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
        const err = new Error("User not found");
        err.statusCode = 404;
        return next(err);
    }

    res.json({ message: "Profile updated", user });
};

exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select("name email");
        if(!user) {
            return res.status(404).json({message: "user Not Found"});
        }

        res.json({
            id: user._id,
            name: user._doc.name,
            email: user.email,
        });
    } catch (error) {
        res.status(500).json({message: 'server error'});
    }
}