const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const index = require('./routes/index');
const userRoutes = require('./routes/user');
const courseRoutes = require('./routes/course');
const orderRoutes = require('./routes/order');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder

// pages

const version1 = '/api/v1/';

app.use('/', index);

app.use('/api/v1', userRoutes);
app.use('/api/v1/course', courseRoutes);
app.use(`${version1}order`, orderRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
