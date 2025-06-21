// routes/user.routes.js
const express = require("express");
const router = express.Router();
const { createUser, getAllUsers, getMyProfile } = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/", createUser);         // Keep for internal testing
router.get("/", getAllUsers);         // Open route
router.get("/me", authMiddleware, getMyProfile);

router.get("/profile", authMiddleware, (req, res) => {
    res.json({ message: "Profile accessed", user: req.user });
});

module.exports = router;
