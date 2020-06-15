const responseHelper = require('../helpers/responseHelper');
const moduleGroupService = require('../services/moduleGroupService');
const db = require('../database/database');

exports.postModuleGroups = async (req, res, next) => {
  const transaction = await db.sequelize.transaction();

  try {
    const ModuleGroupToCreate = req.body;
    const createdModuleGroup = await moduleGroupService.createModuleGroup(transaction, ModuleGroupToCreate);

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

    // the code above only updates the attriutes of the module group but not the related entities
    /* 1. compare old list of modules with new (passed) list of modules
     * 2. module: create when new, delete when not existent anymore or update
     * 3. lecture: create when new, delete when not existent anymore or update
     * -> map array with objects to array of ids and check for differences between old and new
     * (for further dependencies 'set' can be used, e.g. setAcademicRecords)
     */

    transaction.commit();
    return responseHelper(res, 200, 'Successfully updated', updatedModuleGroup);
  } catch (error) {
    transaction.rollback();
    return next(error);
  }
};

exports.deleteModuleGroups = async (req, res, next) => {
  const transaction = await db.sequelize.transaction();
  const moduleGroupId = req.query.moduleGroupId;

  try {
    const deletedModulecatalog = await moduleGroupService.deleteModuleGroup(transaction, moduleGroupId);
    transaction.commit();
    return responseHelper(res, 200, 'Successfully deleted', deletedModulecatalog);
  } catch (error) {
    transaction.rollback();
    return next(error);
  }
};
