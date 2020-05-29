const responseHelper = require('../helpers/responseHelper');
const db = require('../database/database');
const moduleGroupService = require('../services/moduleGroupService');

exports.postModuleGroups = async (req, res) => {
  let transaction = await db.sequelize.transaction();
  try {
    let moduleGroupToCreate = req.body;
    let createdModuleGroup = await moduleGroupService.createModuleGroup(transaction, moduleGroupToCreate);
    transaction.commit();
    return responseHelper(res, 201, 'Successfully created', createdModuleGroup);
  } catch (error) {
    transaction.rollback();
    return responseHelper(res, 500, 'Internal Server Error.');
  }
};

exports.putModuleGroups = async (req, res) => {
  let transaction = await db.sequelize.transaction();
  const moduleGroupId = req.query.moduleGroupId;
  try {
    let moduleGroupToUpdate = { ...req.body, moduleGroup_id: moduleGroupId };
    let updatedModuleGroup = await moduleGroupService.updateModuleGroup(transaction, moduleGroupToUpdate);
    transaction.commit();
    return responseHelper(res, 200, 'Successfully created', updatedModuleGroup);
  } catch (error) {
    transaction.rollback();
    return responseHelper(res, 500, 'Internal Server Error.');
  }
};

exports.deleteModuleGroups = async (req, res) => {
  let transaction = await db.sequelize.transaction();
  const moduleGroupId = req.query.moduleGroupId;
  try {
    let deletedModuleGroup = await moduleGroupService.deleteModuleGroup(transaction, moduleGroupId);
    transaction.commit();
    return responseHelper(res, 200, 'Successfully deleted', deletedModuleGroup);
  } catch (error) {
    transaction.rollback();
    return responseHelper(res, 500, 'Internal Server Error.');
  }
};
