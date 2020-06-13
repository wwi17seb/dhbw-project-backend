const responseHelper = require('../helpers/responseHelper');
const copyObjectHelper = require('../helpers/propertyCopyHelper');
const db = require('../database/database');
const mainFocusService = require('../services/mainFocusService');

exports.getMainFocuses = async (req, res, next) => {
  try {
    const MainFocuses = await mainFocusService.findAll();
    responseHelper(res, 200, '', { MainFocuses });
  } catch (error) {
    return next(error);
  }
};

exports.postMainFocuses = async (req, res, next) => {
  const transaction = await db.sequelize.transaction();
  try {
    const mainFocusToCreate = req.body;
    const createdMainFocus = await mainFocusService.createMainFocus(transaction, mainFocusToCreate);
    transaction.commit();
    return responseHelper(res, 201, 'Successfully created.', createdMainFocus);
  } catch (error) {
    transaction.rollback();
    return next(error);
  }
};

exports.putMainFocuses = async (req, res, next) => {
  const mainFocusId = req.query.mainFocusId;
  const transaction = await db.sequelize.transaction();
  try {
    const mainFocusToUpdate = copyObjectHelper(req.body, ['name']);
    const updatedMainFocus = await mainFocusService.updateMainFocus(transaction, {
      mainFocus_id: mainFocusId,
      name: mainFocusToUpdate.name,
    });
    transaction.commit();
    return responseHelper(res, 200, 'Successfully updated.', updatedMainFocus);
  } catch (error) {
    transaction.rollback();
    return next(error);
  }
};

exports.deleteMainFocuses = async (req, res, next) => {
  const mainFocusId = req.query.mainFocusId;
  const transaction = await db.sequelize.transaction();
  try {
    const deletedMainFocus = await mainFocusService.deleteMainFocus(transaction, mainFocusId);
    transaction.commit();
    return responseHelper(res, 200, 'Successfully deleted.', deletedMainFocus);
  } catch (error) {
    transaction.rollback();
    return next(error);
  }
};
