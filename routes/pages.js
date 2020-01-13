const getDashboard = (req, res) => {
	res.render('dashboard', {title: 'Dashboard'})
}

module.exports = {
	getDashboard
}