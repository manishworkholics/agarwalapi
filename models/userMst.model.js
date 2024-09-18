const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    user_password: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    is_active: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_type: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    lastlogindt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    added_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    added_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    edited_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    edited_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    mobile_no: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    parent_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    full_name: {
      type: DataTypes.STRING(300),
      allowNull: false,
      defaultValue: '',
    },
  }, {
    tableName: 'users', // Explicit table name
    timestamps: false, // Disable createdAt and updatedAt fields
  });
  
  module.exports = User;