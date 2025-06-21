// user-service/controllers/user.controller.js
const User = require("../models/user.model");

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

exports.getMyprofile = async (req, res) => {
    try{
        const user = await User.findById(req.user.userId).select("-password");
        //.select("-password") omits the password from response

        if(!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}