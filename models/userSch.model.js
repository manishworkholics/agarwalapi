const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const UserSchool = sequelize.define('UserSchool', {
    user_sch_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // Allows NULL values
      defaultValue: null,
    },
    sch_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // Allows NULL values
      defaultValue: null,
    },
  }, {
    tableName: 'user_school', // Explicit table name
    timestamps: false, // Disable createdAt and updatedAt fields
  });
  
  module.exports = UserSchool;