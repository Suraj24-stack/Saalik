const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', contactController.getAll);
router.get('/:id', contactController.getById);

// Admin routes (protected)
router.put('/:id/status', protect, contactController.updateStatus);

module.exports = router;