const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.json({message: 'Navigate to /api/v1'})
});

router.get('/api/v1', (req, res) => {
	res.json({message: 'Learn API version 1'})
});

module.exports = router;
