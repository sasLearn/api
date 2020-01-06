const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder

const indexRoute = require('./routes/index');
const userRoutes = require('./routes/user');
const courseRoutes = require('./routes/course');
const orderRoutes = require('./routes/order');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/', indexRoute);
app.use('/api/auth', userRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/order', orderRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
