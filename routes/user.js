const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signUp);
router.post('/login', userCtrl.login);
router.get('/users', userCtrl.getUsers);
router.get('/users/:id', userCtrl.getSingleUser);

module.exports = router;
