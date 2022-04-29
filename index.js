const express = require('express');
const app = express();
const cors = require('cors');

// Adding in dotenv fucntionality to hide API variables.
require('dotenv').config();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
};

// Enabling Corsfor all sources for now until deploying the front end.
app.use('/', cors(corsOptions), require('./routes/main'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;