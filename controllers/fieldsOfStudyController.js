const responseHelper = require('../helpers/responseHelper');
const fieldOfStudyService = require('../services/fieldOfStudyService');
const db = require('../database/database');
const copyObjectHelper = require('../helpers/propertyCopyHelper');

exports.getFieldsOfStudy = async (req, res) => {
  try {
    const withMajorSubjects = req.query.withMajorSubjects;
    const FieldsOfStudy = await fieldOfStudyService.findAll(withMajorSubjects === 'true' ? true : false);
    return responseHelper(res, 200, 'Successful', { FieldsOfStudy });
  } catch (error) {
    transaction.rollback();
    return next(error);
  }
};

exports.postFieldsOfStudy = async (req, res, next) => {
  let transaction = await db.sequelize.transaction();
  try {
    let fieldOfStudyToCreate = copyObjectHelper(req.body, ['name']);
    let createdFieldOfStudy = await fieldOfStudyService.createFieldOfStudy(transaction, fieldOfStudyToCreate.name);
    transaction.commit();
    return responseHelper(res, 201, 'Successfully created', createdFieldOfStudy);
  } catch (error) {
    transaction.rollback();
    return next(error);
  }
};

exports.putFieldsOfStudy = async (req, res, next) => {
  const fieldOfStudyId = req.query.fieldOfStudyId;
  let transaction = await db.sequelize.transaction();
  try {
    let fieldOfStudyToUpdate = copyObjectHelper(req.body, ['name']);
    let updateFieldOfStudy = await fieldOfStudyService.updateFieldOfStudy(transaction, {
      fieldOfStudy_id: fieldOfStudyId,
      name: fieldOfStudyToUpdate.name,
    });
    transaction.commit();
    return responseHelper(res, 200, 'Successfully updated', updateFieldOfStudy);
  } catch (error) {
    transaction.rollback();
    return next(error);
  }
};

exports.deleteFieldsOfStudy = async (req, res, next) => {
  const fieldOfStudyId = req.query.fieldOfStudyId;
  let transaction = await db.sequelize.transaction();
  try {
    let deletedFieldOfStudy = await fieldOfStudyService.deleteFieldOfStudy(transaction, fieldOfStudyId);
    transaction.commit();
    return responseHelper(res, 200, 'Successfully deleted', deletedFieldOfStudy);
  } catch (error) {
    transaction.rollback();
    return next(error);
  }
};
