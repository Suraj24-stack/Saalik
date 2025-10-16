const express = require('express');
const router = express.Router();
const initiativeController = require('../controllers/initiativeController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', initiativeController.getAll);
router.get('/:id', initiativeController.getById);

// Admin routes (protected)
router.post('/', protect, initiativeController.create);
router.put('/:id', protect, initiativeController.update);
router.delete('/:id', protect, initiativeController.delete);

module.exports = router;