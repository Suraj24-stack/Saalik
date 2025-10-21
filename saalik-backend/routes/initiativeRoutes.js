const express = require('express');
const router = express.Router();
const initiativeController = require('../controllers/initiativeController');
const { protect } = require('../middleware/auth');
const { uploadSingle } = require('../middleware/upload');

// Public routes
router.get('/', initiativeController.getAll);
router.get('/:id', initiativeController.getById);

// Admin routes (protected)
// Use uploadSingle('logo_url') to handle file upload with field name 'logo_url'
router.post('/', protect, uploadSingle('logo_url'), initiativeController.create);
router.put('/:id', protect, uploadSingle('logo_url'), initiativeController.update);
router.delete('/:id', protect, initiativeController.delete);

module.exports = router;