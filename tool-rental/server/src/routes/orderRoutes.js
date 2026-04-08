const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.use(authMiddleware);
router.get('/me', orderController.getMyOrders);
router.post('/', orderController.createOrder);

module.exports = router;
