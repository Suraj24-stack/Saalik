// controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/userModel');

// Helper function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      role: user.role 
    },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// Helper function to validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Helper function to validate UUID format
const isValidUUID = (id) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};

// POST /users (admin) - Create new user
exports.createUser = async (req, res) => {
  try {
    const { email, name, password, role = 'user' } = req.body;

    // Validation
    if (!email || !name || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email, name, and password are required',
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long',
      });
    }

    if (!['admin', 'user', 'moderator'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Role must be admin, user, or moderator',
      });
    }

    // Create user using the model
    const newUser = await User.create({
      email: email.toLowerCase().trim(),
      name: name.trim(),
      password,
      role,
    });

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser,
    });
  } catch (err) {
    console.error('Create user error:', err);
    
    if (err.message === 'Email already exists') {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists',
      });
    }

    return res.status(500).json({ 
      success: false, 
      message: 'Failed to create user' 
    });
  }
};

// POST /users/login - User login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login attempt for:", email);

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // Check if user exists
    const [users] = await User.findByEmail({ email: email.toLowerCase().trim() });

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = users[0];

    // Check if email is verified (if your system uses email verification)
    /*if (user.email_verified !== undefined && !user.email_verified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before logging in. Check your inbox for the verification link.",
      });
    } */

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate token
    const token = generateToken(user);

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// GET /users (admin) - Get all users with pagination and search
exports.getUsers = async (req, res) => {
  try {
    // Ensure ints to avoid weird inputs
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || '10', 10), 1), 100);
    const search = (req.query.search || '').trim();
    const role = req.query.role || '';

    const result = await User.findAll({ 
      page, 
      limit, 
      search, 
      role: role ? role : undefined 
    });

    return res.json({
      success: true,
      data: result.rows,
      pagination: result.pagination || {
        currentPage: page,
        totalPages: Math.ceil(result.total / limit),
        total: result.total,
        hasNextPage: page < Math.ceil(result.total / limit),
        hasPrevPage: page > 1
      },
    });
  } catch (err) {
    console.error('Get users error:', err);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch users' 
    });
  }
};

// GET /users/:id (admin) - Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidUUID(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format',
      });
    }

    const user = await User.findPublicById(id);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    return res.json({ 
      success: true, 
      data: user 
    });
  } catch (err) {
    console.error('Get user by ID error:', err);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to get user' 
    });
  }
};

// GET /users/profile (me) - Get current user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findPublicById(req.user.id);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    
    return res.json({ 
      success: true, 
      data: user 
    });
  } catch (err) {
    console.error('Get profile error:', err);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to get profile' 
    });
  }
};

// PUT /users/profile (me) - Update current user profile
exports.updateProfile = async (req, res) => {
  try {
    const { email, name, phone, address } = req.body;
    const updateData = {};

    // Validate email if provided
    if (email !== undefined) {
      if (!email || !isValidEmail(email)) {
        return res.status(400).json({
          success: false,
          message: 'Valid email is required',
        });
      }
      updateData.email = email.toLowerCase().trim();
    }

    // Validate name if provided
    if (name !== undefined) {
      if (!name || name.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Name cannot be empty',
        });
      }
      updateData.name = name.trim();
    }

    // Add phone and address to update data if provided
    if (phone !== undefined) {
      updateData.phone = phone ? phone.trim() : null;
    }

    if (address !== undefined) {
      updateData.address = address ? address.trim() : null;
    }

    const updated = await User.updateProfile(req.user.id, updateData);
    if (!updated) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    return res.json({
      success: true,
      message: 'Profile updated successfully',
      data: updated,
    });
  } catch (err) {
    console.error('Update profile error:', err);
    
    if (err.message === 'Email already exists') {
      return res.status(409).json({
        success: false,
        message: 'Email is already taken by another user',
      });
    }

    return res.status(500).json({ 
      success: false, 
      message: 'Failed to update profile' 
    });
  }
};

// PUT /users/:id/role (admin) - Update user role
exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!isValidUUID(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format',
      });
    }

    if (!role || !['admin', 'user', 'moderator'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Role must be admin, user, or moderator',
      });
    }

    // Prevent changing own role
    if (id === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'Cannot change your own role',
      });
    }

    const updated = await User.updateRole(id, role);
    if (!updated) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    return res.json({
      success: true,
      message: 'User role updated successfully',
      data: updated,
    });
  } catch (err) {
    console.error('Update user role error:', err);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to update user role' 
    });
  }
};

// PUT /users/change-password (me) - Change current user password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required',
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long',
      });
    }

    // Use the model's changePassword method if available
    if (User.changePassword) {
      await User.changePassword(req.user.id, currentPassword, newPassword);
    } else {
      // Fallback to manual verification
      const hash = await User.getPasswordHash(req.user.id);
      if (!hash) {
        return res.status(404).json({ 
          success: false, 
          message: 'User not found' 
        });
      }

      const isCurrentValid = await bcrypt.compare(currentPassword, hash);
      if (!isCurrentValid) {
        return res.status(400).json({ 
          success: false, 
          message: 'Current password is incorrect' 
        });
      }

      // Hash new password and update
      const saltRounds = 10;
      const newHash = await bcrypt.hash(newPassword, saltRounds);
      await User.updatePassword(req.user.id, newHash);
    }

    return res.json({ 
      success: true, 
      message: 'Password changed successfully' 
    });
  } catch (err) {
    console.error('Change password error:', err);
    
    if (err.message === 'Current password is incorrect') {
      return res.status(400).json({ 
        success: false, 
        message: 'Current password is incorrect' 
      });
    }

    return res.status(500).json({ 
      success: false, 
      message: 'Failed to change password' 
    });
  }
};

// PUT /users/:id/reset-password (admin) - Reset user password
exports.resetUserPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    if (!isValidUUID(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format',
      });
    }

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long',
      });
    }

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    
    const updated = await User.updatePassword(id, hashedPassword);
    if (!updated) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    return res.json({ 
      success: true, 
      message: 'User password reset successfully' 
    });
  } catch (err) {
    console.error('Reset user password error:', err);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to reset user password' 
    });
  }
};

// DELETE /users/:id (admin) - Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidUUID(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format',
      });
    }

    // Prevent self-delete
    if (String(id) === String(req.user.id)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cannot delete your own account' 
      });
    }

    const deleted = await User.deleteById(id);
    if (!deleted) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    return res.json({ 
      success: true, 
      message: 'User deleted successfully' 
    });
  } catch (err) {
    console.error('Delete user error:', err);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to delete user' 
    });
  }
};

// GET /users/stats (admin) - Get user statistics
exports.getUserStats = async (req, res) => {
  try {
    if (User.getStats) {
      const stats = await User.getStats();
      return res.json({
        success: true,
        data: stats
      });
    }

    // Fallback if getStats not available
    const totalUsers = await User.countTotal();
    const adminCount = await User.countByRole('admin');
    const userCount = await User.countByRole('user');
    const moderatorCount = await User.countByRole('moderator');

    return res.json({
      success: true,
      data: {
        total_users: totalUsers,
        admin_count: adminCount,
        user_count: userCount,
        moderator_count: moderatorCount
      }
    });
  } catch (err) {
    console.error('Get user stats error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to get user statistics'
    });
  }
};