// models/associations.js
const groupModel = require('./msgGroupModel');
const subGroupModel = require('./msgSubGroupModel');

// Define the associations
groupModel.hasMany(subGroupModel, { foreignKey: 'msg_group_id' });
subGroupModel.belongsTo(groupModel, { foreignKey: 'msg_group_id' });

module.exports = {
  groupModel,
  subGroupModel,
};
