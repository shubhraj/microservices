// user-service/server.js
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const logger = require("./utils/logger");
const errorHandler = require("./middleware/error.middleware");

const app = express();
app.use(express.json());

const userRoutes = require("./routes/user.routes");
app.use("/api/users", userRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

app.use("/", (req, res) => {
      res.send("hello there");
})

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        logger.info("MongoDB connected");
        app.listen(3001, () => logger.info("User Service running on port 3001"));
    })
    .catch(err => console.error(err));

app.use(errorHandler);