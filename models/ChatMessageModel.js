// models/Message.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config'); // Adjust this according to your project structure
const StudentModel = require('./studentModel'); // Import Student model

const ChatMessage = sequelize.define('Chat_Message', {
  chat_msg_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  msg_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sender_id: {
    type: DataTypes.INTEGER,
    allowNull: false,   
  },
  mobile_no: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  receiver_id: {
    type: DataTypes.INTEGER,
    allowNull: true,   
  },
  group_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  sent_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'Chat_Message',
  timestamps: false,
});

module.exports = ChatMessage;
