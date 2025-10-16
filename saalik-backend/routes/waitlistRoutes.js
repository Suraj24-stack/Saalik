const express = require('express');
const router = express.Router();
const waitlistController = require('../controllers/waitlistController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', waitlistController.getAll);
router.get('/:id', waitlistController.getById);

// Admin routes (protected)
router.put('/:id/status', protect, waitlistController.updateStatus);

module.exports = router;