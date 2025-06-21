// user-service/controllers/user.controller.js
const User = require("../models/user.model");


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