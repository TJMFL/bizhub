const express = require('express');
const router = express.Router();
const { authMiddleware } = require('./middleware/auth');
const businessController = require('../controllers/businessController');

// Create business route - requires authentication
router.post('/', authMiddleware, businessController.createBusiness);

module.exports = router;