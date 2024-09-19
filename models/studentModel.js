// App ke top ki categories heeeee
// models/Student.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config'); // adjust this according to your project structure
const parentModel = require('./parentModel'); // Import Parent model

// Define the Student model
const studentModel = sequelize.define('student', {
  student_id : {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  student_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  scholar_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  parents_mobile_number: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  parents_id: {
    type: DataTypes.INTEGER, // Updated to INTEGER to match Parent model's ID
    allowNull: true,
    references: {
      model: 'parents', // name of the Parent model table
      key: 'parents_id', // key to match in the Parent model
    },
  },
  
}, {
  tableName: 'student', 
   timestamps: false,
});

studentModel.belongsTo(parents, { foreignKey: 'parent_id', as: 'parent' });

module.exports = studentModel;