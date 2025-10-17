// routes/userRoute.js
const express = require('express');
const { protect, authorize } = require('../middleware/auth'); // ← Fixed import
const {
  createUser,
  Login,
  getUsers,
  getUserById,
  getProfile,
  updateProfile,
  updateUserRole,
  changePassword,
  resetUserPassword,
  deleteUser,
  getUserStats,
} = require('../controllers/userController');

const router = express.Router();

// PUBLIC ROUTES
router.post('/Login', Login);
router.post('/', createUser);

// USER-SPECIFIC ROUTES
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);

// ADMIN-ONLY ROUTES
router.get('/stats', protect, authorize('admin'), getUserStats);
router.get('/', protect, authorize('admin'), getUsers);
router.get('/:id', protect, authorize('admin'), getUserById);
router.put('/:id/role', protect, authorize('admin'), updateUserRole);
router.put('/:id/reset-password', protect, authorize('admin'), resetUserPassword);
router.delete('/:id', protect, authorize('admin'), deleteUser);

module.exports = router;