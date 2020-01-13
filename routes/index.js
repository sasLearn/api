const express = require('express');
const app = express();
// const fs = require('fs');

module.exports = {
	getHomePage: (req, res, next) => {
		res.render('index', { title: 'Saslearn Home'});
	},
	getDashboard: (req, res) => {
		res.render('dashboard', {title: 'Dashboard'})
	},
	getRedirect: (req, res) => {
		res.redirect('/api/dashboard')
	}
};
