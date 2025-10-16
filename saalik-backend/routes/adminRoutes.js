// backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { query, queryOne } = require('../config/database');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/v1/admin/dashboard
// @desc    Get dashboard statistics
// @access  Private (Admin)
router.get('/dashboard', protect, async (req, res) => {
  try {
    // Get total stories
    const totalStoriesResult = await queryOne('SELECT COUNT(*) as count FROM stories');
    const publishedStoriesResult = await queryOne('SELECT COUNT(*) as count FROM stories WHERE is_published = TRUE');
    
    // Get total views
    const totalViewsResult = await queryOne('SELECT SUM(views) as total FROM stories');
    
    // Get waitlist stats
    const waitlistTotalResult = await queryOne('SELECT COUNT(*) as count FROM waitlist');
    const waitlistTodayResult = await queryOne('SELECT COUNT(*) as count FROM waitlist WHERE DATE(created_at) = CURDATE()');
    
    // Get contact stats
    const contactTotalResult = await queryOne('SELECT COUNT(*) as count FROM contact_submissions');
    const contactUnreadResult = await queryOne('SELECT COUNT(*) as count FROM contact_submissions WHERE status = "new"');
    
    // Get story suggestions
    const suggestionsPendingResult = await queryOne('SELECT COUNT(*) as count FROM story_suggestions WHERE status = "pending"');
    
    // Get partners and initiatives count
    const partnersCountResult = await queryOne('SELECT COUNT(*) as count FROM partners WHERE is_active = TRUE');
    const initiativesCountResult = await queryOne('SELECT COUNT(*) as count FROM initiatives WHERE is_active = TRUE');
    
    // Get recent stories
    const recentStories = await query(`
      SELECT id, title, slug, views, is_published, created_at 
      FROM stories 
      ORDER BY created_at DESC 
      LIMIT 5
    `);
    
    // Get popular stories
    const popularStories = await query(`
      SELECT id, title, slug, views, is_published 
      FROM stories 
      WHERE is_published = TRUE 
      ORDER BY views DESC 
      LIMIT 5
    `);

    // Get recent waitlist entries
    const recentWaitlist = await query(`
      SELECT id, name, email, created_at 
      FROM waitlist 
      ORDER BY created_at DESC 
      LIMIT 5
    `);

    // Get recent contact submissions
    const recentContacts = await query(`
      SELECT id, name, email, subject, status, created_at 
      FROM contact_submissions 
      ORDER BY created_at DESC 
      LIMIT 5
    `);

    res.json({
      success: true,
      data: {
        overview: {
          totalStories: totalStoriesResult?.count || 0,
          publishedStories: publishedStoriesResult?.count || 0,
          totalViews: totalViewsResult?.total || 0,
          waitlistTotal: waitlistTotalResult?.count || 0,
          waitlistToday: waitlistTodayResult?.count || 0,
          contactTotal: contactTotalResult?.count || 0,
          contactUnread: contactUnreadResult?.count || 0,
          suggestionsPending: suggestionsPendingResult?.count || 0,
          partnersCount: partnersCountResult?.count || 0,
          initiativesCount: initiativesCountResult?.count || 0
        },
        recentStories,
        popularStories,
        recentWaitlist,
        recentContacts
      }
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/v1/admin/analytics
// @desc    Get analytics data
// @access  Private (Admin)
router.get('/analytics', protect, async (req, res) => {
  try {
    // Stories published per month (last 6 months)
    const storiesPerMonth = await query(`
      SELECT 
        DATE_FORMAT(published_at, '%Y-%m') as month,
        COUNT(*) as count
      FROM stories
      WHERE is_published = TRUE
      AND published_at >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
      GROUP BY DATE_FORMAT(published_at, '%Y-%m')
      ORDER BY month DESC
    `);

    // Views per month
    const viewsPerMonth = await query(`
      SELECT 
        DATE_FORMAT(published_at, '%Y-%m') as month,
        SUM(views) as total_views
      FROM stories
      WHERE is_published = TRUE
      AND published_at >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
      GROUP BY DATE_FORMAT(published_at, '%Y-%m')
      ORDER BY month DESC
    `);

    // Waitlist signups per month
    const waitlistPerMonth = await query(`
      SELECT 
        DATE_FORMAT(created_at, '%Y-%m') as month,
        COUNT(*) as count
      FROM waitlist
      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
      GROUP BY DATE_FORMAT(created_at, '%Y-%m')
      ORDER BY month DESC
    `);

    // Contact submissions per month
    const contactsPerMonth = await query(`
      SELECT 
        DATE_FORMAT(created_at, '%Y-%m') as month,
        COUNT(*) as count
      FROM contact_submissions
      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
      GROUP BY DATE_FORMAT(created_at, '%Y-%m')
      ORDER BY month DESC
    `);

    // Top locations by story count
    const topLocations = await query(`
      SELECT 
        location,
        COUNT(*) as count
      FROM stories
      WHERE is_published = TRUE AND location IS NOT NULL
      GROUP BY location
      ORDER BY count DESC
      LIMIT 10
    `);

    res.json({
      success: true,
      data: {
        storiesPerMonth,
        viewsPerMonth,
        waitlistPerMonth,
        contactsPerMonth,
        topLocations
      }
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/v1/admin/users
// @desc    Get all admin users
// @access  Private (Super Admin)
router.get('/users', protect, authorize('super_admin'), async (req, res) => {
  try {
    const users = await query(`
      SELECT id, username, email, full_name, role, is_active, last_login, created_at
      FROM admins
      ORDER BY created_at DESC
    `);

    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/v1/admin/users/:id/toggle-active
// @desc    Toggle user active status
// @access  Private (Super Admin)
router.put('/users/:id/toggle-active', protect, authorize('super_admin'), async (req, res) => {
  try {
    const { id } = req.params;

    // Can't deactivate yourself
    if (parseInt(id) === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot deactivate your own account'
      });
    }

    // Toggle active status
    await query('UPDATE admins SET is_active = NOT is_active WHERE id = ?', [id]);

    const user = await queryOne('SELECT id, username, email, is_active FROM admins WHERE id = ?', [id]);

    res.json({
      success: true,
      message: `User ${user.is_active ? 'activated' : 'deactivated'} successfully`,
      data: user
    });
  } catch (error) {
    console.error('Toggle user active error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/v1/admin/activity-logs
// @desc    Get recent activity logs
// @access  Private (Admin)
router.get('/activity-logs', protect, async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;

    const logs = await query(`
      SELECT 
        al.*,
        a.username,
        a.full_name
      FROM activity_logs al
      LEFT JOIN admins a ON al.admin_id = a.id
      ORDER BY al.created_at DESC
      LIMIT ? OFFSET ?
    `, [parseInt(limit), parseInt(offset)]);

    const totalResult = await queryOne('SELECT COUNT(*) as total FROM activity_logs');
    const total = totalResult?.total || 0;

    res.json({
      success: true,
      count: logs.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      data: logs
    });
  } catch (error) {
    console.error('Get activity logs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;