// routes/users.js
const express = require('express');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const {
  createUser,
  login,
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

// ========================================
// PUBLIC ROUTES (No Authentication Required)
// ========================================

// POST /users/login - User login
router.post('/login', login);

// POST /users - Create new user (can be public for registration or admin-only)
router.post('/', createUser);

// ========================================
// USER-SPECIFIC ROUTES (Must come before /:id routes)
// ========================================

// GET /users/profile - Get current user profile
router.get('/profile', authenticateToken, getProfile);

// PUT /users/profile - Update current user profile
router.put('/profile', authenticateToken, updateProfile);

// PUT /users/change-password - Change current user password
router.put('/change-password', authenticateToken, changePassword);

// GET /users/stats - Get user statistics (admin only)
router.get('/stats', authenticateToken, requireAdmin, getUserStats);

// ========================================
// ADMIN-ONLY ROUTES
// ========================================

// GET /users - Get all users with pagination and search (admin only)
router.get('/', authenticateToken, requireAdmin, getUsers);

// GET /users/:id - Get user by ID (admin only)
router.get('/:id', authenticateToken, requireAdmin, getUserById);

// PUT /users/:id/role - Update user role (admin only)
router.put('/:id/role', authenticateToken, requireAdmin, updateUserRole);

// PUT /users/:id/reset-password - Reset user password (admin only)
router.put('/:id/reset-password', authenticateToken, requireAdmin, resetUserPassword);

// DELETE /users/:id - Delete user (admin only)
router.delete('/:id', authenticateToken, requireAdmin, deleteUser);

module.exports = router;