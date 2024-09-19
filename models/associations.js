const groupModel = require('./msgGroupModel');
const subGroupModel = require('./msgSubGroupModel');

// Define the associations
subGroupModel.belongsTo(groupModel, { foreignKey: 'msg_group_id' });
groupModel.hasMany(subGroupModel, { foreignKey: 'msg_group_id' });
