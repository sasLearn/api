const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const orderCtrl = require('../controllers/order');

router.get('/', auth, orderCtrl.getOrders);

router.post('/', orderCtrl.createOrder);

module.exports = router;
