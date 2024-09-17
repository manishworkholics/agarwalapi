const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');


const admission_refund = sequelize.define('admission_refund', {
    auto_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    student_name: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    mobile_no: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    acc_no: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    bank_name: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    branch_name: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    ifsc_code: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    reason1: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    reason2: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    reason3: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    attachment: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    entry_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    approved: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    approved_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    approved_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ip: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    prefix: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    sno: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    tableName: 'student_bank_details', // Specify the table name
    timestamps: false, // Disable createdAt and updatedAt fields
  });
  
  module.exports = admission_refund;