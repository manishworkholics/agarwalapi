// models/associations.js
const groupModel = require('./msgGroupModel');
const subGroupModel = require('./msgSubGroupModel');
// const msgMasterModel = require('./msgMasterModel');

// Define the associations
groupModel.hasMany(subGroupModel, { foreignKey: 'msg_group_id' });
subGroupModel.belongsTo(groupModel, { foreignKey: 'msg_group_id' });
// fsdf
module.exports = {
  groupModel,
  subGroupModel,
  // msgMasterModel,
};
