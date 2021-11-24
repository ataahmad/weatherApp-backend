const express = require('express');
const app = express();

// Adding in dotenv fucntionality to hide API variables.
require('dotenv').config();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', require('./routes/main'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;