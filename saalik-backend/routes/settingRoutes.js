const express = require('express');
const router = express.Router();
const settingController = require('../controllers/settingController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', settingController.getAll);
router.get('/:key', settingController.getByKey);

// Admin routes (protected)
router.put('/:key', protect, settingController.update);

module.exports = router;