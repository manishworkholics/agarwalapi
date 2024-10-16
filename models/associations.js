// models/associations.js
const groupModel = require('./msgGroupModel');
const subGroupModel = require('./msgSubGroupModel');
const msgMasterModel = require('./msgMasterModel');
const msgBodyModel = require('./msgBodyModel');
const sendedMsgModel = require('./sendedMsgModel');
const studentMainDetailModel = require('./studentModel');
const schoolModel = require('./schoolMasterModel');
const feesDisplayModel = require('./feesModel');
const RepliedMessageModel = require('./RepliedMessageModel');
const RepliedMsgBodyModel = require('./RepliedMsgDetailModel');
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
// School id match with school id and display school
// In your schoolModel.js
schoolModel.hasMany(msgMasterModel, {
  foreignKey: 'school_id', // The field in msgMasterModel that refers to sch_id
  sourceKey: 'sch_id',
});

// In your msgMasterModel.js
msgMasterModel.belongsTo(schoolModel, {
  foreignKey: 'school_id', // The field in msgMasterModel that refers to sch_id
  targetKey: 'sch_id',
});
// School id match with school id and display school

// link group and subgroup in msg
msgMasterModel.belongsTo(subGroupModel, {
  foreignKey: 'msg_sgroup_id', // foreign key in msgMaster
  as: 'subgroup',              // Alias to use in your query
});
subGroupModel.belongsTo(groupModel, {
  foreignKey: 'msg_group_id', // Foreign key in subgroup model
  as: 'group',                // Alias for the group association
});
// link group and subgroup in msg

// ==========reply msg
// In RepliedMessageModel definition
RepliedMessageModel.belongsTo(msgMasterModel, {
  foreignKey: 'msg_id', // Foreign key in RepliedMessageModel
  as: 'message',        // Alias for the association
});

// In MessageModel definition (optional, if needed)
msgMasterModel.hasMany(RepliedMessageModel, {
  foreignKey: 'msg_id',
  as: 'repliedMessages',
});
RepliedMessageModel.hasMany(RepliedMsgBodyModel, {
  foreignKey: 'replied_msg_id',
  as: 'replyBodies', // Alias for linking reply bodies with the message
});

RepliedMsgBodyModel.belongsTo(RepliedMessageModel, {
  foreignKey: 'replied_msg_id',
  as: 'repliedMessage', // Optional alias for reverse association
});
RepliedMessageModel.belongsTo(sendedMsgModel, {
  foreignKey: 'sended_msg_id', // This should match the foreign key in RepliedMessageModel
  as: 'sendedMessage', // Alias for the association
});
// ==========reply msg

module.exports = {
  groupModel,
  subGroupModel,
  msgMasterModel,msgBodyModel,sendedMsgModel,studentMainDetailModel,feesDisplayModel,schoolModel,RepliedMessageModel,RepliedMsgBodyModel
};

