// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { body, validationResult } = require('express-validator');
const { query, queryOne } = require('../config/database');
const { generateToken, protect } = require('../middleware/auth');

// ============================================
// @route   POST /api/v1/auth/register
// @desc    Register new user
// @access  Public
// ============================================
router.post('/register', [
  body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('full_name').trim().notEmpty().withMessage('Full name is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map(err => err.msg)
      });
    }

    const { username, email, password, full_name, role = 'editor' } = req.body;

    // Check if user exists
    const existingUser = await queryOne(
      'SELECT id FROM admins WHERE email = ? OR username = ?',
      [email, username]
    );

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or username already exists'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Generate email verification token (optional)
    const email_verification_token = crypto.randomBytes(32).toString('hex');
    const email_verified = true; // Set to false if you want email verification

    // Insert user
    const result = await query(
      `INSERT INTO admins (username, email, password_hash, full_name, role, email_verified, email_verification_token) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [username, email, password_hash, full_name, role, email_verified, email_verification_token]
    );

    // Generate token
    const token = generateToken(result.insertId);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: {
        id: result.insertId,
        username,
        email,
        full_name,
        role,
        email_verified
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
});

// ============================================
// @route   POST /api/v1/auth/login
// @desc    Login user (LOWERCASE)
// @access  Public
// ============================================
router.post('/login', [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map(err => err.msg)
      });
    }

    const { email, password } = req.body;

    // Check if user exists
    const user = await queryOne(
      'SELECT * FROM admins WHERE email = ?',
      [email]
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if account is active
    if (!user.is_active) {
      return res.status(401).json({
        success: false,
        message: 'Account is disabled. Please contact administrator'
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Update last login
    await query(
      'UPDATE admins SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
      [user.id]
    );

    // Generate token
    const token = generateToken(user.id);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        email_verified: user.email_verified || true
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

// ============================================
// @route   GET /api/v1/auth/me
// @desc    Get current logged in user
// @access  Private
// ============================================
router.get('/me', protect, async (req, res) => {
  try {
    const user = await queryOne(
      'SELECT id, username, email, full_name, role, last_login, created_at, email_verified FROM admins WHERE id = ?',
      [req.user.id]
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// ============================================
// @route   POST /api/v1/auth/logout
// @desc    Logout user
// @access  Private
// ============================================
router.post('/logout', protect, async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// ============================================
// @route   GET /api/v1/auth/verify-email
// @desc    Verify email with token
// @access  Public
// ============================================
router.get('/verify-email', async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Verification token is required'
      });
    }

    // Find user with this token
    const user = await queryOne(
      'SELECT id FROM admins WHERE email_verification_token = ?',
      [token]
    );

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification token'
      });
    }

    // Update user as verified
    await query(
      'UPDATE admins SET email_verified = TRUE, email_verification_token = NULL WHERE id = ?',
      [user.id]
    );

    res.json({
      success: true,
      message: 'Email verified successfully'
    });
  } catch (error) {
    console.error('Verify email error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// ============================================
// @route   POST /api/v1/auth/resend-verification
// @desc    Resend verification email
// @access  Public
// ============================================
router.post('/resend-verification', [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed'
      });
    }

    const { email } = req.body;

    const user = await queryOne(
      'SELECT id, email_verified FROM admins WHERE email = ?',
      [email]
    );

    if (!user) {
      // Don't reveal if user exists
      return res.json({
        success: true,
        message: 'If your email is registered, you will receive a verification email'
      });
    }

    if (user.email_verified) {
      return res.status(400).json({
        success: false,
        message: 'Email is already verified'
      });
    }

    // Generate new token
    const email_verification_token = crypto.randomBytes(32).toString('hex');

    await query(
      'UPDATE admins SET email_verification_token = ? WHERE id = ?',
      [email_verification_token, user.id]
    );

    // TODO: Send email with verification link
    // await sendVerificationEmail(email, email_verification_token);

    res.json({
      success: true,
      message: 'Verification email sent successfully'
    });
  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// ============================================
// @route   POST /api/v1/auth/forgot-password
// @desc    Request password reset
// @access  Public
// ============================================
router.post('/forgot-password', [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed'
      });
    }

    const { email } = req.body;

    const user = await queryOne(
      'SELECT id FROM admins WHERE email = ?',
      [email]
    );

    if (!user) {
      // Don't reveal if user exists
      return res.json({
        success: true,
        message: 'If your email is registered, you will receive a password reset link'
      });
    }

    // Generate reset token
    const reset_token = crypto.randomBytes(32).toString('hex');
    const reset_token_expiry = new Date(Date.now() + 3600000); // 1 hour

    await query(
      'UPDATE admins SET password_reset_token = ?, password_reset_expiry = ? WHERE id = ?',
      [reset_token, reset_token_expiry, user.id]
    );

    // TODO: Send email with reset link
    // await sendPasswordResetEmail(email, reset_token);

    res.json({
      success: true,
      message: 'Password reset email sent successfully'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// ============================================
// @route   POST /api/v1/auth/reset-password
// @desc    Reset password with token
// @access  Public
// ============================================
router.post('/reset-password', [
  body('token').notEmpty().withMessage('Reset token is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed'
      });
    }

    const { token, newPassword } = req.body;

    // Find user with valid token
    const user = await queryOne(
      'SELECT id FROM admins WHERE password_reset_token = ? AND password_reset_expiry > NOW()',
      [token]
    );

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(newPassword, salt);

    // Update password and clear reset token
    await query(
      'UPDATE admins SET password_hash = ?, password_reset_token = NULL, password_reset_expiry = NULL WHERE id = ?',
      [password_hash, user.id]
    );

    res.json({
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// ============================================
// @route   POST /api/v1/auth/refresh-token
// @desc    Refresh JWT token
// @access  Private
// ============================================
router.post('/refresh-token', protect, async (req, res) => {
  try {
    // Generate new token
    const token = generateToken(req.user.id);

    // Get updated user data
    const user = await queryOne(
      'SELECT id, username, email, full_name, role FROM admins WHERE id = ?',
      [req.user.id]
    );

    res.json({
      success: true,
      token,
      user
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// ============================================
// @route   PUT /api/v1/auth/update-password
// @desc    Update password (when logged in)
// @access  Private
// ============================================
router.put('/update-password', protect, [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed'
      });
    }

    const { currentPassword, newPassword } = req.body;

    // Get user with password
    const user = await queryOne(
      'SELECT password_hash FROM admins WHERE id = ?',
      [req.user.id]
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(newPassword, salt);

    // Update password
    await query(
      'UPDATE admins SET password_hash = ? WHERE id = ?',
      [password_hash, req.user.id]
    );

    res.json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    console.error('Update password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;