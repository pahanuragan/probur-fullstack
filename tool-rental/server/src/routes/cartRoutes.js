const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.use(authMiddleware);
router.get('/', cartController.getMyCart);
router.post('/items', cartController.addCartItem);
router.delete('/items/:id', cartController.removeCartItem);

module.exports = router;
