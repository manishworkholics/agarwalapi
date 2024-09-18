// App ke top ki categories heeeee
// models/Student.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config'); // adjust this according to your project structure

// Define the Student model
const informationModel = sequelize.define('information', {
  informationid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  detail: {
    type: DataTypes.STRING,
    allowNull: true,
  }, 
}, {
  tableName: 'information', 
   timestamps: false,
});


module.exports = informationModel;