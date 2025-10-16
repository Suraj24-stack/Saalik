// models/userModel.js
const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const PUBLIC_COLUMNS = `
  id, name, email, role, phone, address, email_verified, created_at, updated_at
`;

const PRIVATE_COLUMNS = `
  id, name, email, password, role, phone, address, email_verified, created_at, updated_at
`;

/**
 * Find users with pagination and optional search (MySQL).
 * LIMIT/OFFSET must be numbers (no strings).
 */
exports.findAll = async ({ page = 1, limit = 10, search = '', role = '' }) => {
  const offset = (page - 1) * limit;
  
  const conditions = [];
  const params = [];
  
  if (search) {
    conditions.push('(name LIKE ? OR email LIKE ?)');
    params.push(`%${search}%`, `%${search}%`);
  }
  
  if (role) {
    conditions.push('role = ?');
    params.push(role);
  }
  
  const whereSql = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  
  // Data query
  const dataSql = `
    SELECT ${PUBLIC_COLUMNS}
    FROM users
    ${whereSql}
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;
  const dataParams = [...params, Number(limit), Number(offset)];
  const [rows] = await pool.execute(dataSql, dataParams);
  
  // Count query (use same WHERE/params)
  const countSql = `
    SELECT COUNT(*) AS count
    FROM users
    ${whereSql}
  `;
  const [countRows] = await pool.execute(countSql, params);
  const total = countRows[0]?.count ? Number(countRows[0].count) : 0;
  
  return { 
    rows, 
    total,
    pagination: {
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1
    }
  };
};

/**
 * Find public user by id
 */
exports.findPublicById = async (id) => {
  if (!id) return null;
  
  const sql = `SELECT ${PUBLIC_COLUMNS} FROM users WHERE id = ? LIMIT 1`;
  const [rows] = await pool.execute(sql, [id]);
  return rows[0] || null;
};

/**
 * Find user by id (includes password for internal use)
 */
exports.findById = async (id) => {
  if (!id) return null;
  
  const sql = `SELECT ${PRIVATE_COLUMNS} FROM users WHERE id = ? LIMIT 1`;
  const [rows] = await pool.execute(sql, [id]);
  return rows[0] || null;
};

/**
 * Find user by email (for login functionality)
 * Returns in the format expected by controller: [users]
 */
exports.findByEmail = async ({ email }) => {
  if (!email) return [[]];
  
  const sql = `SELECT ${PRIVATE_COLUMNS} FROM users WHERE email = ? LIMIT 1`;
  const [rows] = await pool.execute(sql, [email]);
  
  // Return in the format expected by controller: [users]
  return [rows];
};

/**
 * Check if email exists
 */
exports.emailExists = async (email, excludeId = null) => {
  let sql = `SELECT id FROM users WHERE email = ?`;
  let params = [email];
  
  if (excludeId) {
    sql += ' AND id != ?';
    params.push(excludeId);
  }
  
  const [rows] = await pool.execute(sql, params);
  return rows.length > 0;
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
  const emailExists = await this.emailExists(email);
  if (emailExists) {
    throw new Error('Email already exists');
  }
  
  const id = uuidv4();
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  const sql = `
    INSERT INTO users (id, name, email, password, role, phone, address, email_verified, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, NULL, NULL, FALSE, NOW(), NOW())
  `;
  
  try {
    await pool.execute(sql, [id, name, email, hashedPassword, role]);
    
    // Return public user data
    return await this.findPublicById(id);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      throw new Error('Email already exists');
    }
    throw error;
  }
};

/**
 * Update profile fields (name, email, phone, address)
 */
exports.updateProfile = async (id, updateData) => {
  if (!id) return null;
  
  const fields = [];
  const params = [];
  
  if (updateData.name !== undefined) {
    fields.push('name = ?');
    params.push(updateData.name);
  }
  
  if (updateData.email !== undefined) {
    // Check if email already exists for another user
    const emailExists = await this.emailExists(updateData.email, id);
    if (emailExists) {
      throw new Error('Email already exists');
    }
    fields.push('email = ?');
    params.push(updateData.email);
  }
  
  if (updateData.phone !== undefined) {
    fields.push('phone = ?');
    params.push(updateData.phone);
  }
  
  if (updateData.address !== undefined) {
    fields.push('address = ?');
    params.push(updateData.address);
  }
  
  if (updateData.role !== undefined) {
    fields.push('role = ?');
    params.push(updateData.role);
  }
  
  if (fields.length === 0) {
    return await this.findPublicById(id);
  }
  
  fields.push('updated_at = NOW()');
  params.push(id);
  
  const sql = `
    UPDATE users
    SET ${fields.join(', ')}
    WHERE id = ?
  `;
  
  try {
    const [result] = await pool.execute(sql, params);
    
    if (result.affectedRows === 0) return null;
    
    // Return updated public fields
    return await this.findPublicById(id);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
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
  
  const sql = `
    UPDATE users
    SET role = ?, updated_at = NOW()
    WHERE id = ?
  `;
  const [result] = await pool.execute(sql, [role, id]);
  
  if (result.affectedRows === 0) return null;
  
  // Return updated public fields
  return await this.findPublicById(id);
};

/**
 * Get password hash by user id
 */
exports.getPasswordHash = async (id) => {
  if (!id) return null;
  
  const sql = `SELECT password FROM users WHERE id = ? LIMIT 1`;
  const [rows] = await pool.execute(sql, [id]);
  return rows[0]?.password || null;
};

/**
 * Update password hash
 */
exports.updatePassword = async (id, newPassword) => {
  if (!id || !newPassword) return false;
  
  // If password is already hashed, use it directly
  // If not hashed, hash it
  let hashedPassword;
  if (newPassword.startsWith('$2a$') || newPassword.startsWith('$2b$')) {
    hashedPassword = newPassword;
  } else {
    const salt = await bcrypt.genSalt(12);
    hashedPassword = await bcrypt.hash(newPassword, salt);
  }
  
  const sql = `
    UPDATE users
    SET password = ?, updated_at = NOW()
    WHERE id = ?
  `;
  const [result] = await pool.execute(sql, [hashedPassword, id]);
  return result.affectedRows > 0;
};

/**
 * Verify old password and update with new password
 */
exports.changePassword = async (id, oldPassword, newPassword) => {
  if (!id || !oldPassword || !newPassword) {
    throw new Error('User ID, old password, and new password are required');
  }
  
  // Get current password hash
  const currentHash = await this.getPasswordHash(id);
  if (!currentHash) {
    throw new Error('User not found');
  }
  
  // Verify old password
  const isValidOldPassword = await bcrypt.compare(oldPassword, currentHash);
  if (!isValidOldPassword) {
    throw new Error('Current password is incorrect');
  }
  
  // Update with new password
  return await this.updatePassword(id, newPassword);
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
  
  const sql = `DELETE FROM users WHERE id = ?`;
  const [result] = await pool.execute(sql, [id]);
  return result.affectedRows > 0;
};

/**
 * Soft delete user (add deleted_at column if needed)
 */
exports.softDeleteById = async (id) => {
  if (!id) return false;
  
  const sql = `
    UPDATE users 
    SET deleted_at = NOW(), updated_at = NOW() 
    WHERE id = ? AND deleted_at IS NULL
  `;
  const [result] = await pool.execute(sql, [id]);
  return result.affectedRows > 0;
};

/**
 * Find users by role
 */
exports.findByRole = async (role) => {
  if (!role) return [];
  
  const sql = `SELECT ${PUBLIC_COLUMNS} FROM users WHERE role = ? ORDER BY created_at DESC`;
  const [rows] = await pool.execute(sql, [role]);
  return rows;
};

/**
 * Count users by role
 */
exports.countByRole = async (role) => {
  if (!role) return 0;
  
  const sql = `SELECT COUNT(*) AS count FROM users WHERE role = ?`;
  const [rows] = await pool.execute(sql, [role]);
  return rows[0]?.count ? Number(rows[0].count) : 0;
};

/**
 * Count total users
 */
exports.countTotal = async () => {
  const sql = `SELECT COUNT(*) AS count FROM users`;
  const [rows] = await pool.execute(sql);
  return rows[0]?.count ? Number(rows[0].count) : 0;
};

/**
 * Get all unique roles
 */
exports.getAllRoles = async () => {
  const sql = `SELECT DISTINCT role FROM users ORDER BY role`;
  const [rows] = await pool.execute(sql);
  return rows.map(row => row.role);
};

/**
 * Get user statistics
 */
exports.getStats = async () => {
  const sql = `
    SELECT 
      COUNT(*) as total_users,
      COUNT(CASE WHEN role = 'admin' THEN 1 END) as admin_count,
      COUNT(CASE WHEN role = 'user' THEN 1 END) as user_count,
      COUNT(CASE WHEN role = 'moderator' THEN 1 END) as moderator_count,
      COUNT(CASE WHEN DATE(created_at) = CURDATE() THEN 1 END) as today_registrations,
      COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY) THEN 1 END) as week_registrations,
      COUNT(CASE WHEN email_verified = TRUE THEN 1 END) as verified_users
    FROM users
  `;
  const [rows] = await pool.execute(sql);
  return rows[0];
};

/**
 * Find recently registered users
 */
exports.findRecentUsers = async (limit = 5) => {
  const sql = `
    SELECT ${PUBLIC_COLUMNS} 
    FROM users 
    ORDER BY created_at DESC 
    LIMIT ?
  `;
  const [rows] = await pool.execute(sql, [Number(limit)]);
  return rows;
};

/**
 * Bulk update user roles
 */
exports.bulkUpdateRoles = async (userIds, role) => {
  if (!userIds || !Array.isArray(userIds) || userIds.length === 0 || !role) {
    return 0;
  }
  
  const placeholders = userIds.map(() => '?').join(',');
  const sql = `
    UPDATE users 
    SET role = ?, updated_at = NOW() 
    WHERE id IN (${placeholders})
  `;
  const [result] = await pool.execute(sql, [role, ...userIds]);
  return result.affectedRows;
};

/**
 * Update email verification status
 */
exports.updateEmailVerification = async (id, verified = true) => {
  if (!id) return false;
  
  const sql = `
    UPDATE users
    SET email_verified = ?, updated_at = NOW()
    WHERE id = ?
  `;
  const [result] = await pool.execute(sql, [verified, id]);
  return result.affectedRows > 0;
};

/**
 * Find users with email verification status
 */
exports.findByEmailVerification = async (verified = true) => {
  const sql = `
    SELECT ${PUBLIC_COLUMNS} 
    FROM users 
    WHERE email_verified = ? 
    ORDER BY created_at DESC
  `;
  const [rows] = await pool.execute(sql, [verified]);
  return rows;
};

/**
 * Get user login history (if you have a login_history table)
 */
exports.getLoginHistory = async (userId, limit = 10) => {
  const sql = `
    SELECT login_at, ip_address, user_agent
    FROM login_history 
    WHERE user_id = ? 
    ORDER BY login_at DESC 
    LIMIT ?
  `;
  try {
    const [rows] = await pool.execute(sql, [userId, Number(limit)]);
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
  const sql = `
    INSERT INTO login_history (user_id, login_at, ip_address, user_agent)
    VALUES (?, NOW(), ?, ?)
  `;
  try {
    await pool.execute(sql, [userId, ipAddress, userAgent]);
    return true;
  } catch (error) {
    // Table might not exist, just continue
    console.log('Could not record login history:', error.message);
    return false;
  }
};