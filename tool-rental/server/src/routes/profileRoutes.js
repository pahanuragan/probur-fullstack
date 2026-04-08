const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const profileController = require('../controllers/profileController');

const router = express.Router();

router.get('/', authMiddleware, profileController.getProfile);

module.exports = router;
