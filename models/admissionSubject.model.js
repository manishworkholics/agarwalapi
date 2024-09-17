const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const admission_subject = sequelize.define('admission_subject', {
    auto_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    admission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING(200),
      allowNull: false,
      collate: 'latin1_swedish_ci',
    },
    subject_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    amount: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    }
  }, {
    tableName: 'subject_details', // Specify the table name
    timestamps: false, // Disable createdAt and updatedAt fields
  });
  
  module.exports = admission_subject;