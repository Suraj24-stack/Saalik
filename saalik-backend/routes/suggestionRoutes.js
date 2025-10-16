const express = require('express');
const router = express.Router();
const storySuggestionController = require('../controllers/storySuggestionController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', storySuggestionController.getAll);
router.get('/:id', storySuggestionController.getById);

// Admin routes (protected)
router.put('/:id/status', protect, storySuggestionController.updateStatus);

module.exports = router;