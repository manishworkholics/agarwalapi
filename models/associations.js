// models/associations.js
const groupModel = require('./msgGroupModel');
const subGroupModel = require('./msgSubGroupModel');
const msgMasterModel = require('./msgMasterModel');
const msgBodyModel = require('./msgBodyModel');
// Define the associations
groupModel.hasMany(subGroupModel, { foreignKey: 'msg_group_id' });
subGroupModel.belongsTo(groupModel, { foreignKey: 'msg_group_id' });
msgMasterModel.belongsTo(subGroupModel, { foreignKey: 'msg_sgroup_id' });
// Define the association between msgMasterModel and msgBodyModel

msgMasterModel.hasMany(msgBodyModel, { foreignKey: 'msg_id' });
msgBodyModel.belongsTo(msgMasterModel, { foreignKey: 'msg_id' });

// fsdf

module.exports = {
  groupModel,
  subGroupModel,
  msgMasterModel,msgBodyModel
};

