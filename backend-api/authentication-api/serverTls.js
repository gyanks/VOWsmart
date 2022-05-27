//require('rootpath')();
const https = require('https')
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./_middleware/error-handler');
const { default: helmet } = require('helmet');


const fs = require('fs');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);


const options = {

    key: fs.readFileSync('./key/key.pem'),
    cert: fs.readFileSync('./key/cert.pem')
};

// start server
//const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
//app.listen(port, () => console.log('Server listening on port ' + port));

https.createServer(options, app).listen(5000, () => console.log("secure server is running on port 5000"));