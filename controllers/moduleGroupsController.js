const responseHelper = require('../helpers/responseHelper');
const errorResponseHelper = require('../helpers/errorResponseHelper');
const moduleGroupService = require('../services/moduleGroupService');
const db = require('../database/database');

exports.postModuleGroups = async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    const ModuleGroupToCreate = req.body;
    const createdModuleGroup = await moduleGroupService.createModuleGroup(transaction, ModuleGroupToCreate);

    transaction.commit();
    return responseHelper(res, 201, 'Successfully created', createdModuleGroup);
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, error);
  }
};

exports.putModuleGroups = async (req, res) => {
  const moduleGroup_id = req.query.moduleGroupId;
  const transaction = await db.sequelize.transaction();

  try {
    if (!moduleGroup_id) {
      throw new Error('No module group given');
    }

    const ModuleGroupToUpdate = req.body;
    const updatedModuleGroup = await moduleGroupService.updateModuleGroup(transaction, {
      ...ModuleGroupToUpdate,
      moduleGroup_id,
    });
    if (!updatedModuleGroup) {
      throw new Error('No module group to update');
    }

    transaction.commit();
    return responseHelper(res, 200, 'Successfully updated', updatedModuleGroup);
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, error);
  }
};

exports.deleteModuleGroups = async (req, res) => {
  const moduleGroupId = req.query.moduleGroupId;
  const transaction = await db.sequelize.transaction();

  try {
    if (!moduleGroupId) {
      throw new Error('No module group given');
    }

    const deletedModulecatalog = await moduleGroupService.deleteModuleGroup(transaction, moduleGroupId);
    if (!deletedModulecatalog) {
      throw new Error('No module group found to delete');
    }

    transaction.commit();
    return responseHelper(res, 200, 'Successfully deleted', deletedModulecatalog);
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, error);
  }
};
