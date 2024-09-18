const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const agent = sequelize.define('agent', {
    agent_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    sch_code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      collate: 'latin1_swedish_ci',
    },
    bank_sch_short_nm: {
      type: DataTypes.STRING(50),
      allowNull: false,
      collate: 'latin1_swedish_ci',
    },
    agent_code: {
      type: DataTypes.BIGINT(15),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
      collate: 'latin1_swedish_ci',
    },
    agent_name: {
      type: DataTypes.STRING(300),
      allowNull: false,
      collate: 'latin1_swedish_ci',
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: false,
      collate: 'latin1_swedish_ci',
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(500),
      allowNull: false,
      collate: 'latin1_swedish_ci',
    },
    city: {
      type: DataTypes.STRING(200),
      allowNull: false,
      collate: 'latin1_swedish_ci',
    },
    state: {
      type: DataTypes.STRING(200),
      allowNull: false,
      collate: 'latin1_swedish_ci',
    },
    pincode: {
      type: DataTypes.STRING(10),
      allowNull: false,
      collate: 'latin1_swedish_ci',
    },
    mobile_no: {
      type: DataTypes.STRING(20),
      allowNull: false,
      collate: 'latin1_swedish_ci',
    },
    mobile_no_alt: {
      type: DataTypes.STRING(20),
      allowNull: false,
      collate: 'latin1_swedish_ci',
    },
    email_id: {
      type: DataTypes.STRING(200),
      allowNull: false,
      collate: 'latin1_swedish_ci',
    },
    attachment1: {
      type: DataTypes.STRING(200),
      allowNull: false,
      collate: 'latin1_swedish_ci',
    },
    attachment2: {
      type: DataTypes.STRING(200),
      allowNull: false,
      collate: 'latin1_swedish_ci',
    },
    attachment3: {
      type: DataTypes.STRING(200),
      allowNull: false,
      collate: 'latin1_swedish_ci',
    },
    agent_reg_fee: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },
    entry_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    payable_amount: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },
    pay_gateway: {
      type: DataTypes.STRING(50),
      allowNull: false,
      collate: 'latin1_swedish_ci',
    },
    is_response: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
    },
    trn_ref_no: {
      type: DataTypes.STRING(200),
      allowNull: false,
      collate: 'latin1_swedish_ci',
    },
    bank_trn_id: {
      type: DataTypes.STRING(200),
      allowNull: false,
      collate: 'latin1_swedish_ci',
    },
    bank_trn_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    pay_mode: {
      type: DataTypes.STRING(10),
      allowNull: false,
      collate: 'latin1_swedish_ci',
    },
    currency: {
      type: DataTypes.STRING(10),
      allowNull: false,
      collate: 'latin1_swedish_ci',
    },
    paid_amount: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },
    statusCode: {
      type: DataTypes.STRING(20),
      allowNull: false,
      collate: 'latin1_swedish_ci',
    },
    statusDesc: {
      type: DataTypes.STRING(300),
      allowNull: false,
      collate: 'latin1_swedish_ci',
    },
    full_responce: {
      type: DataTypes.STRING(5000),
      allowNull: false,
      collate: 'latin1_swedish_ci',
    },
    responce_datetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ip: {
      type: DataTypes.STRING(100),
      allowNull: false,
      collate: 'latin1_swedish_ci',
    },
    is_active: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
    },
  }, {
    tableName: 'agent_details', // Specify the table name
    timestamps: false, // Disable createdAt and updatedAt fields
  });
  
  module.exports = agent;