const express = require('express');
const router = express.Router();
const partnerController = require('../controllers/partnerController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', partnerController.getAll);
router.get('/:id', partnerController.getById);

// Admin routes (protected)
router.post('/', protect, partnerController.create);
router.put('/:id', protect, partnerController.update);
router.delete('/:id', protect, partnerController.delete);

module.exports = router;