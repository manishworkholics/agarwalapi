const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const batch_master = sequelize.define('batch_master', {
    batch_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    batch_name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      collate: 'utf8mb3_unicode_ci',
    },
    from_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    to_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    every_month: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    plan_from_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    plan_to_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
    },
    added_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    added_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    edited_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    edited_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'batch', // Specify the table name
    timestamps: false, // Disable createdAt and updatedAt fields
  });
  
  module.exports = batch_master;