const express = require('express');
const router = express.Router();
const storyController = require('../controllers/storyController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', storyController.getAll);
router.get('/:id', storyController.getById);

// Admin routes (protected)
router.post('/', protect, storyController.create);
router.put('/:id', protect, storyController.update);
router.delete('/:id', protect, storyController.delete);

module.exports = router;