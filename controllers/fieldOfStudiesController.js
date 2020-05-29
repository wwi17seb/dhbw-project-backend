const responseHelper = require('../helpers/responseHelper');
const fieldOfStudyService = require('../services/fieldOfStudyService');
const db = require('../database/database');
const copyObjectHelper = require('../helpers/propertyCopyHelper');

exports.getFieldOfStudies = async (req, res) => {
  const withMajorSubjects = req.query.withMajorSubjects;
  const fieldOfStudies = await fieldOfStudyService.findAll(withMajorSubjects === 'true' ? true : false);
  responseHelper(res, 200, 'Successful', { fieldOfStudies });
};
exports.postFieldOfStudies = async (req, res) => {
  let transaction = await db.sequelize.transaction();
  try {
    let fieldOfStudyToCreate = copyObjectHelper(req.body, ['name']);
    let createdFieldOfStudy = await fieldOfStudyService.createFieldOfStudy(transaction, fieldOfStudyToCreate.name);
    transaction.commit();
    return responseHelper(res, 201, 'Successfully created', createdFieldOfStudy);
  } catch (error) {
    transaction.rollback();
    return responseHelper(res, 500, 'Internal Server Error.');
  }
};
exports.putFieldOfStudies = async (req, res) => {
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
    return responseHelper(res, 500, 'Internal Server Error.');
  }
};
exports.deleteFieldOfStudies = async (req, res) => {
  const fieldOfStudyId = req.query.fieldOfStudyId;
  let transaction = await db.sequelize.transaction();
  try {
    let deletedFieldOfStudy = await fieldOfStudyService.deleteFieldOfStudy(transaction, fieldOfStudyId);
    transaction.commit();
    return responseHelper(res, 200, 'Successfully deleted', deletedFieldOfStudy);
  } catch (error) {
    transaction.rollback();
    return responseHelper(res, 500, 'Internal Server Error.');
  }
};
