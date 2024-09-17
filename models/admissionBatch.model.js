const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

// Define the model
const admission_batch = sequelize.define('admission_batch', {
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
    batch_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    batch_name: {
        type: DataTypes.STRING(200),
        allowNull: false,
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
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    plan_to_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    }
}, {
    tableName: 'batches', // Specify the table name
    timestamps: false, // Disable createdAt and updatedAt fields
});

module.exports = admission_batch;
