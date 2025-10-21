const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Waitlist = sequelize.define('Waitlist', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(100), allowNull: false },
  phone: { type: DataTypes.STRING(20), allowNull: true },  // ADD THIS
  travel_date: { type: DataTypes.DATE, allowNull: true },  // ADD THIS
  destination: { type: DataTypes.STRING(255), allowNull: true },  // ADD THIS
  message: { type: DataTypes.TEXT },
  status: { 
    type: DataTypes.ENUM('pending','contacted','approved','rejected'), // Updated statuses
    defaultValue: 'pending' 
  },
  ip_address: { type: DataTypes.STRING(45) },
  user_agent: { type: DataTypes.TEXT },
}, {
  tableName: 'waitlist',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Waitlist;