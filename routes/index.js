const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.render('index', { title: 'Saslearn Home'})
});

module.exports = app;