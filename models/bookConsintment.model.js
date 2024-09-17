const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const book_consignment = sequelize.define('book_consignmento', {
    auto_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    consignment_no: {
        type: DataTypes.STRING(500),
        allowNull: false,
        collate: 'utf8mb3_general_ci',
    },
    added_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    added_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    memo_prefix: {
        type: DataTypes.STRING(100),
        allowNull: false,
        collate: 'utf8mb3_general_ci',
    },
    memo_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    memo_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    dispatch_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    season: {
        type: DataTypes.STRING(20),
        allowNull: false,
        collate: 'utf8mb3_unicode_ci',
    },
}, {
    tableName: 'order_memo', // Explicit table name
    timestamps: false, // Disable createdAt and updatedAt fields
});

module.exports = book_consignment;