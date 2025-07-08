// user-service/server.js
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const logger = require("./utils/logger");
const errorHandler = require("./middleware/error.middleware");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
        app.listen(PORT, '0.0.0.0',() => logger.info(`User Service running on port ${PORT}`));
    })
    .catch(err => console.error(err));

app.use(errorHandler);