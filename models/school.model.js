const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const School = sequelize.define('School', {
    school_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    sch_code: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    bank_sch_short_nm: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    school_name: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    pincode: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    mobile_no: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    mobile_no_alt: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    email_id: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    owner1: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    owner1_mobile_no: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    owner1_email_id: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    owner2: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    owner2_mobile_no: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    owner2_email_id: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    principal: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    principal_mobile_no: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    principal_email_id: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    vice_principal: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    vice_principal_mobile_no: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    vice_principal_email_id: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    attachment1: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    attachment2: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    attachment3: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    total_strength: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_amount: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },
    entry_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    coupon_code: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    discount_per: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },
    igst_amt: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },
    agent_code: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    payable_amount: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },
    pay_gateway: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    is_response: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
    },
    trn_ref_no: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    bank_trn_id: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    bank_trn_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    pay_mode: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    paid_amount: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },
    statusCode: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    statusDesc: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    full_responce: {
      type: DataTypes.STRING(5000),
      allowNull: false,
    },
    responce_datetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ip: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    is_active: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
    },
  }, {
    tableName: 'school',
    timestamps: false, // Disable createdAt and updatedAt fields
  });
  
  module.exports = School;