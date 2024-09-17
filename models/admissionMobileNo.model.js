const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

// Define the model
const admission_mobile_no = sequelize.define('admission_mobile_no', {
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
    date_of_birth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    current_mobile_no: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    new_mobile_no: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    reason: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    entry_date: {
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
    },
    admission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'students', // Specify the table name
    timestamps: false, // Disable createdAt and updatedAt fields
});

module.exports = admission_mobile_no;
