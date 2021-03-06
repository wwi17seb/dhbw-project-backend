const responseHelper = require('../helpers/responseHelper');
const errorResponseHelper = require('../helpers/errorResponseHelper');
const copyObjectHelper = require('../helpers/propertyCopyHelper');
const db = require('../database/database');
const mainFocusService = require('../services/mainFocusService');

exports.getMainFocuses = async (req, res) => {
  try {
    const MainFocuses = await mainFocusService.findAll();

    responseHelper(res, 200, 'Successful', { MainFocuses });
  } catch (error) {
    return errorResponseHelper(res, error);
  }
};

exports.postMainFocuses = async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    const mainFocusToCreate = copyObjectHelper(req.body, ['name']);
    const createdMainFocus = await mainFocusService.createMainFocus(transaction, mainFocusToCreate);

    transaction.commit();
    return responseHelper(res, 201, 'Successfully created', createdMainFocus);
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, error);
  }
};

exports.putMainFocuses = async (req, res) => {
  const mainFocusId = req.query.mainFocusId;
  const transaction = await db.sequelize.transaction();

  try {
    if (!mainFocusId) {
      throw new Error('No main focus given');
    }

    const mainFocusToUpdate = copyObjectHelper(req.body, ['name']);
    const updatedMainFocus = await mainFocusService.updateMainFocus(transaction, {
      mainFocus_id: mainFocusId,
      name: mainFocusToUpdate.name,
    });
    if (!updatedMainFocus) {
      throw new Error('No main focus found to update');
    }

    transaction.commit();
    return responseHelper(res, 200, 'Successfully updated', updatedMainFocus);
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, error);
  }
};

exports.deleteMainFocuses = async (req, res) => {
  const mainFocusId = req.query.mainFocusId;
  const transaction = await db.sequelize.transaction();

  try {
    if (!mainFocusId) {
      throw new Error('No main focus given');
    }

    const deletedMainFocus = await mainFocusService.deleteMainFocus(transaction, mainFocusId);
    if (!deletedMainFocus) {
      throw new Error('No main focus found to delete');
    }

    transaction.commit();
    return responseHelper(res, 200, 'Successfully deleted', deletedMainFocus);
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, error);
  }
};
