const responseHelper = require('../helpers/responseHelper');
const moduleGroupService = require('../services/moduleGroupService');
const moduleService = require('../services/moduleService');
const lectureService = require('../services/lectureService');
const db = require('../database/database');

exports.postModuleGroups = async (req, res, next) => {
  let transaction = await db.sequelize.transaction();

  try {
    let ModuleGroupToCreate = req.body;
    let createdModuleGroup = await moduleGroupService.createModuleGroup(transaction, ModuleGroupToCreate);

    transaction.commit();
    return responseHelper(res, 201, 'Successfully created', createdModuleGroup);
  } catch (error) {
    transaction.rollback();
    return next(error);
  }
};

exports.putModuleGroups = async (req, res, next) => {
  const transaction = await db.sequelize.transaction();
  const moduleGroup_id = req.query.moduleGroupId;

  try {
    const ModuleGroupToUpdate = req.body;
    const updatedModuleGroup = await moduleGroupService.updateModuleGroup(transaction, {
      ...ModuleGroupToUpdate,
      moduleGroup_id,
    });

    transaction.commit();
    return responseHelper(res, 200, 'Successfully updated', updatedModuleGroup);
  } catch (error) {
    transaction.rollback();
    return next(error);
  }
};

exports.deleteModuleGroups = async (req, res, next) => {
  let transaction = await db.sequelize.transaction();
  const moduleGroupId = req.query.moduleGroupId;
  try {
    let deletedModulecatalog = await moduleGroupService.deleteModuleGroup(transaction, moduleGroupId);
    transaction.commit();
    return responseHelper(res, 200, 'Successfully deleted', deletedModulecatalog);
  } catch (error) {
    transaction.rollback();
    return next(error);
  }
};
