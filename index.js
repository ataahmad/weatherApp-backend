const express = require('express');
const cors = require('cors');
const app = express();
//const main = require('./routes/main');

// Adding in dotenv fucntionality to hide API variables.
require('dotenv').config();


// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// var corsOptions = {
//     origin: '*',
//     optionsSuccessStatus: 200
// }

// app.use(cors(corsOptions));


app.use('/', require('./routes/main'));
//app.use('/', cors(corsOptions), main);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;