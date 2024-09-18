const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const sch_mst = sequelize.define('sch_mst', {
    sch_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unsigned: true,
    },
    sch_nm: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    sch_short_nm: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    is_active: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    entry_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    entry_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    edit_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    edit_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    scroll_news_text: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    def_msg_ids: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    text_color: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    bg_color: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    contact_no: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    email_id: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    logo_img: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    session: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: '',
    },
    season: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: '',
    },
    mail_email_id: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: '',
    },
  }, {
    tableName: 'school',
    timestamps: false, // Disable createdAt and updatedAt fields
  });
  
  module.exports = sch_mst;