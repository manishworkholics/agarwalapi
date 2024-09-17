const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

// Define the model
const Admission = sequelize.define('Admission', {
  admission_id: {
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
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  student_id: {
    type: DataTypes.BIGINT(15),
    allowNull: false,
  },
  student_name: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  date_of_birth: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  class: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  class_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  email_id: {
    type: DataTypes.STRING(200),
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
  address: {
    type: DataTypes.STRING(100),
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
  attachment1: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  attachment2: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  attachment3: {
    type: DataTypes.STRING(100),
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
  sgst_amt: {
    type: DataTypes.DECIMAL(18, 2),
    allowNull: false,
  },
  cgst_amt: {
    type: DataTypes.DECIMAL(18, 2),
    allowNull: false,
  },
  igst_amt: {
    type: DataTypes.DECIMAL(18, 2),
    allowNull: false,
  },
  subject_amt: {
    type: DataTypes.DECIMAL(18, 2),
    allowNull: false,
  },
  agent_code: {
    type: DataTypes.STRING(100),
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
  },
  is_response: {
    type: DataTypes.INTEGER,
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
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  invoice_prefix: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  invoice_no: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bank_name: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  diposite_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  mode_of_payment: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  branch_name: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  branch_code: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  receipt_prefix: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  receipt_no: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  registration_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'admissions', // Optional: If the table name is different
  timestamps: false, // Disable automatic timestamp columns (createdAt, updatedAt)
});

module.exports = Admission;
