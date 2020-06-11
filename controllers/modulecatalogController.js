const responseHelper = require('../helpers/responseHelper');
const moduleGroupService = require('../services/moduleGroupService');
const moduleService = require('../services/moduleService');
const db = require('../database/database');

exports.getModulecatalog = async (req, res) => {
  const majorSubjectId = req.query.majorSubjectId;
  responseHelper(res, 501, 'Not yet implemented.');
};

exports.postModulecatalog = async (req, res) => {
  let transaction = await db.sequelize.transaction();
  try {
    let ModulecatalogToCreate = req.body;
    let createdModules = req.body.modules;
    let createdModulecatalog = await moduleGroupService.createModuleGroup(transaction, ModulecatalogToCreate);
    createdModulecatalog.Modules = await Promise.all(
      createdModules.map(async (moduleToCreate) => {
        const createdModule = await moduleService.createModule(transaction, {
          moduleGroup_id: createdModulecatalog.moduleGroup_id,
          ...moduleToCreate,
        });
        return createdModule;
      })
    );
    transaction.commit();
    return responseHelper(res, 201, 'Successfully created', createdModulecatalog);
  } catch (error) {
    transaction.rollback();
    return next(error);
  }
};

exports.putModulecatalog = async (req, res) => {
  let transaction = await db.sequelize.transaction();
  const moduleGroupId = req.query.moduleGroupId;
  try {
    let ModulecatalogToUpdate = { ...req.body, moduleGroup_id: moduleGroupId };
    let updatedModulecatalog = await moduleGroupService.updateModuleGroup(transaction, ModulecatalogToUpdate);
    transaction.commit();
    return responseHelper(res, 200, 'Successfully updated.', updatedModulecatalog);
  } catch (error) {
    transaction.rollback();
    return next(error);
  }
};

exports.deleteModulecatalog = async (req, res) => {
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
