// models/associations.js
const groupModel = require('./msgGroupModel');
const subGroupModel = require('./msgSubGroupModel');
const msgMasterModel = require('./msgMasterModel');
const msgBodyModel = require('./msgBodyModel');
const sendedMsgModel = require('./sendedMsgModel');
const studentMainDetailModel = require('./studentModel');
const feesDisplayModel = require('./feesModel');
// Define the associations
groupModel.hasMany(subGroupModel, { foreignKey: 'msg_group_id' });
subGroupModel.belongsTo(groupModel, { foreignKey: 'msg_group_id' });
msgMasterModel.belongsTo(subGroupModel, { foreignKey: 'msg_sgroup_id' });
// Define the association between msgMasterModel and msgBodyModel

msgMasterModel.hasMany(msgBodyModel, { foreignKey: 'msg_id' });
msgBodyModel.belongsTo(msgMasterModel, { foreignKey: 'msg_id' });

// fsdf
sendedMsgModel.belongsTo(msgMasterModel, { foreignKey: 'msg_id' });
msgMasterModel.hasMany(sendedMsgModel, { foreignKey: 'msg_id' });

sendedMsgModel.belongsTo(studentMainDetailModel, {
  foreignKey: 'scholar_no', // scholar_no in sendedMsgModel
  targetKey: 'student_number', // student_number in studentMainDetailModel
  as: 'student' // Alias to refer to studentMainDetailModel
});

sendedMsgModel.hasMany(msgBodyModel, { foreignKey: 'msg_id', sourceKey: 'msg_id', as: 'msgBody' });
// sendedMsgModel.belongsTo(msgBodyModel, {
//   foreignKey: 'msg_id', // foreignKey in sendedMsgModel
//   targetKey: 'msg_id',  // primaryKey in msgBodyModel
//   as: 'messageBody', // Alias for the join
// });

// start for fees model
// In your feesDisplayModel file
feesDisplayModel.belongsTo(studentMainDetailModel, {
  foreignKey: 'scholar_no', // Make sure this matches the correct foreign key
  targetKey: 'student_number', // This should match the primary key in the student model
  as: 'student' // Use the same alias you are using in the query
});

// In your student_main_detailModel file
studentMainDetailModel.hasMany(feesDisplayModel, {
  foreignKey: 'scholar_no',
  sourceKey: 'student_number',
  as: 'fees' // This can be whatever you want, but ensure it's not conflicting
});
// end for fees model

module.exports = {
  groupModel,
  subGroupModel,
  msgMasterModel,msgBodyModel,sendedMsgModel,studentMainDetailModel,feesDisplayModel
};

