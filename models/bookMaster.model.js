const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const books_master = sequelize.define('books_master', {
    book_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    book_name: {
      type: DataTypes.STRING(300),
      allowNull: false,
      collate: 'utf8mb3_general_ci',
    },
    class: {
      type: DataTypes.STRING(10),
      allowNull: false,
      collate: 'latin1_swedish_ci',
    },
    no_books_in_set: {
      type: DataTypes.STRING(10),
      allowNull: false,
      collate: 'latin1_swedish_ci',
    },
    rate: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },
    is_active: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
    },
    display_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.DECIMAL(18, 2),
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
    tableName: 'book', // Specify the table name
    timestamps: false, // Disable createdAt and updatedAt fields
  });
  
  module.exports = books_master;