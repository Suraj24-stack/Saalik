const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('user', 'admin', 'moderator'),
    defaultValue: 'user',
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  email_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  paranoid: false, // We'll handle soft delete manually
});

// Public columns (exclude password)
const PUBLIC_ATTRIBUTES = [
  'id', 'name', 'email', 'role', 'phone', 'address', 
  'email_verified', 'created_at', 'updated_at'
];

// Hash password before creating
User.beforeCreate(async (user) => {
  if (user.password) {
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

/**
 * Find users with pagination and optional search
 */
exports.findAll = async ({ page = 1, limit = 10, search = '', role = '' }) => {
  const offset = (page - 1) * limit;
  
  const where = {};
  
  if (search) {
    where[sequelize.Sequelize.Op.or] = [
      { name: { [sequelize.Sequelize.Op.like]: `%${search}%` } },
      { email: { [sequelize.Sequelize.Op.like]: `%${search}%` } },
    ];
  }
  
  if (role) {
    where.role = role;
  }
  
  const { count, rows } = await User.findAndCountAll({
    where,
    attributes: PUBLIC_ATTRIBUTES,
    limit: Number(limit),
    offset: Number(offset),
    order: [['created_at', 'DESC']],
  });
  
  return {
    rows,
    total: count,
    pagination: {
      currentPage: Number(page),
      totalPages: Math.ceil(count / limit),
      hasNextPage: page < Math.ceil(count / limit),
      hasPrevPage: page > 1,
    },
  };
};

/**
 * Find public user by id
 */
exports.findPublicById = async (id) => {
  if (!id) return null;
  
  return await User.findByPk(id, {
    attributes: PUBLIC_ATTRIBUTES,
  });
};

/**
 * Find user by id (includes password for internal use)
 */
exports.findById = async (id) => {
  if (!id) return null;
  
  return await User.findByPk(id);
};

/**
 * Find user by email (for login functionality)
 * Returns in the format expected by controller: [users]
 */
exports.findByEmail = async ({ email }) => {
  if (!email) return [[]];
  
  const user = await User.findOne({
    where: { email },
  });
  
  // Return in the format expected by controller: [users]
  return [[user].filter(Boolean)];
};

/**
 * Check if email exists
 */
exports.emailExists = async (email, excludeId = null) => {
  const where = { email };
  
  if (excludeId) {
    where.id = { [sequelize.Sequelize.Op.ne]: excludeId };
  }
  
  const count = await User.count({ where });
  return count > 0;
};

/**
 * Create new user
 */
exports.create = async ({ name, email, password, role = 'user' }) => {
  // Validate required fields
  if (!name || !email || !password) {
    throw new Error('Name, email, and password are required');
  }
  
  // Check if email already exists
  const emailExists = await exports.emailExists(email);
  if (emailExists) {
    throw new Error('Email already exists');
  }
  
  try {
    const user = await User.create({
      id: uuidv4(),
      name,
      email,
      password, // Will be hashed by beforeCreate hook
      role,
    });
    
    // Return public user data
    return await exports.findPublicById(user.id);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new Error('Email already exists');
    }
    throw error;
  }
};

/**
 * Update profile fields (name, email, phone, address, role)
 */
exports.updateProfile = async (id, updateData) => {
  if (!id) return null;
  
  const user = await User.findByPk(id);
  if (!user) return null;
  
  // Check if email already exists for another user
  if (updateData.email && updateData.email !== user.email) {
    const emailExists = await exports.emailExists(updateData.email, id);
    if (emailExists) {
      throw new Error('Email already exists');
    }
  }
  
  const allowedFields = ['name', 'email', 'phone', 'address', 'role'];
  const updates = {};
  
  allowedFields.forEach(field => {
    if (updateData[field] !== undefined) {
      updates[field] = updateData[field];
    }
  });
  
  if (Object.keys(updates).length === 0) {
    return await exports.findPublicById(id);
  }
  
  try {
    await user.update(updates);
    return await exports.findPublicById(id);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new Error('Email already exists');
    }
    throw error;
  }
};

/**
 * Update user role only
 */
exports.updateRole = async (id, role) => {
  if (!id || !role) return null;
  
  const user = await User.findByPk(id);
  if (!user) return null;
  
  await user.update({ role });
  return await exports.findPublicById(id);
};

/**
 * Get password hash by user id
 */
exports.getPasswordHash = async (id) => {
  if (!id) return null;
  
  const user = await User.findByPk(id, {
    attributes: ['password'],
  });
  
  return user?.password || null;
};

/**
 * Update password hash
 */
exports.updatePassword = async (id, newPassword) => {
  if (!id || !newPassword) return false;
  
  const user = await User.findByPk(id);
  if (!user) return false;
  
  // If password is already hashed, use it directly
  // If not hashed, hash it
  let hashedPassword;
  if (newPassword.startsWith('$2a$') || newPassword.startsWith('$2b$')) {
    hashedPassword = newPassword;
  } else {
    const salt = await bcrypt.genSalt(12);
    hashedPassword = await bcrypt.hash(newPassword, salt);
  }
  
  await user.update({ password: hashedPassword });
  return true;
};

/**
 * Verify old password and update with new password
 */
exports.changePassword = async (id, oldPassword, newPassword) => {
  if (!id || !oldPassword || !newPassword) {
    throw new Error('User ID, old password, and new password are required');
  }
  
  // Get current password hash
  const currentHash = await exports.getPasswordHash(id);
  if (!currentHash) {
    throw new Error('User not found');
  }
  
  // Verify old password
  const isValidOldPassword = await bcrypt.compare(oldPassword, currentHash);
  if (!isValidOldPassword) {
    throw new Error('Current password is incorrect');
  }
  
  // Update with new password
  return await exports.updatePassword(id, newPassword);
};

/**
 * Compare password
 */
exports.comparePassword = async (candidatePassword, hashedPassword) => {
  if (!candidatePassword || !hashedPassword) return false;
  
  return await bcrypt.compare(candidatePassword, hashedPassword);
};

/**
 * Delete user by id
 */
exports.deleteById = async (id) => {
  if (!id) return false;
  
  const result = await User.destroy({
    where: { id },
  });
  
  return result > 0;
};

/**
 * Soft delete user
 */
exports.softDeleteById = async (id) => {
  if (!id) return false;
  
  const user = await User.findByPk(id);
  if (!user || user.deleted_at) return false;
  
  await user.update({ deleted_at: new Date() });
  return true;
};

/**
 * Find users by role
 */
exports.findByRole = async (role) => {
  if (!role) return [];
  
  return await User.findAll({
    where: { role },
    attributes: PUBLIC_ATTRIBUTES,
    order: [['created_at', 'DESC']],
  });
};

/**
 * Count users by role
 */
exports.countByRole = async (role) => {
  if (!role) return 0;
  
  return await User.count({
    where: { role },
  });
};

/**
 * Count total users
 */
exports.countTotal = async () => {
  return await User.count();
};

/**
 * Get all unique roles
 */
exports.getAllRoles = async () => {
  const users = await User.findAll({
    attributes: [[sequelize.fn('DISTINCT', sequelize.col('role')), 'role']],
    order: [['role', 'ASC']],
    raw: true,
  });
  
  return users.map(user => user.role);
};

/**
 * Get user statistics
 */
exports.getStats = async () => {
  const stats = await User.findOne({
    attributes: [
      [sequelize.fn('COUNT', sequelize.col('id')), 'total_users'],
      [sequelize.fn('SUM', sequelize.literal("CASE WHEN role = 'admin' THEN 1 ELSE 0 END")), 'admin_count'],
      [sequelize.fn('SUM', sequelize.literal("CASE WHEN role = 'user' THEN 1 ELSE 0 END")), 'user_count'],
      [sequelize.fn('SUM', sequelize.literal("CASE WHEN role = 'moderator' THEN 1 ELSE 0 END")), 'moderator_count'],
      [sequelize.fn('SUM', sequelize.literal("CASE WHEN DATE(created_at) = CURDATE() THEN 1 ELSE 0 END")), 'today_registrations'],
      [sequelize.fn('SUM', sequelize.literal("CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY) THEN 1 ELSE 0 END")), 'week_registrations'],
      [sequelize.fn('SUM', sequelize.literal("CASE WHEN email_verified = TRUE THEN 1 ELSE 0 END")), 'verified_users'],
    ],
    raw: true,
  });
  
  return stats;
};

/**
 * Find recently registered users
 */
exports.findRecentUsers = async (limit = 5) => {
  return await User.findAll({
    attributes: PUBLIC_ATTRIBUTES,
    order: [['created_at', 'DESC']],
    limit: Number(limit),
  });
};

/**
 * Bulk update user roles
 */
exports.bulkUpdateRoles = async (userIds, role) => {
  if (!userIds || !Array.isArray(userIds) || userIds.length === 0 || !role) {
    return 0;
  }
  
  const [affectedRows] = await User.update(
    { role },
    {
      where: {
        id: { [sequelize.Sequelize.Op.in]: userIds },
      },
    }
  );
  
  return affectedRows;
};

/**
 * Update email verification status
 */
exports.updateEmailVerification = async (id, verified = true) => {
  if (!id) return false;
  
  const user = await User.findByPk(id);
  if (!user) return false;
  
  await user.update({ email_verified: verified });
  return true;
};

/**
 * Find users with email verification status
 */
exports.findByEmailVerification = async (verified = true) => {
  return await User.findAll({
    where: { email_verified: verified },
    attributes: PUBLIC_ATTRIBUTES,
    order: [['created_at', 'DESC']],
  });
};

/**
 * Get user login history (if you have a login_history table)
 */
exports.getLoginHistory = async (userId, limit = 10) => {
  try {
    const sql = `
      SELECT login_at, ip_address, user_agent
      FROM login_history 
      WHERE user_id = ? 
      ORDER BY login_at DESC 
      LIMIT ?
    `;
    const [rows] = await sequelize.query(sql, {
      replacements: [userId, Number(limit)],
      type: sequelize.QueryTypes.SELECT,
    });
    return rows;
  } catch (error) {
    // Table might not exist, return empty array
    return [];
  }
};

/**
 * Record user login (if you have a login_history table)
 */
exports.recordLogin = async (userId, ipAddress = null, userAgent = null) => {
  try {
    const sql = `
      INSERT INTO login_history (user_id, login_at, ip_address, user_agent)
      VALUES (?, NOW(), ?, ?)
    `;
    await sequelize.query(sql, {
      replacements: [userId, ipAddress, userAgent],
      type: sequelize.QueryTypes.INSERT,
    });
    return true;
  } catch (error) {
    // Table might not exist, just continue
    console.log('Could not record login history:', error.message);
    return false;
  }
};

// Export the model as well
exports.User = User;