const db = require('../config/db.config');
const { DataTypes } = require('sequelize');

// const User = db.define('test', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     role: {
//         type: DataTypes.ENUM('Parent', 'Admin', 'Teacher'),
//         allowNull: false
//     }
// });

// module.exports = User;
