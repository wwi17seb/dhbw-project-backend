const responseHelper = require('../helpers/responseHelper');
const errorResponseHelper = require('../helpers/errorResponseHelper');
const fieldOfStudyService = require('../services/fieldOfStudyService');
const db = require('../database/database');
const copyObjectHelper = require('../helpers/propertyCopyHelper');

exports.getFieldsOfStudy = async (req, res, next) => {
  try {
    const withMajorSubjects = req.query.withMajorSubjects;
    const FieldsOfStudy = await fieldOfStudyService.findAll(withMajorSubjects === 'true' ? true : false);

    return responseHelper(res, 200, 'Successful', { FieldsOfStudy });
  } catch (error) {
    return errorResponseHelper(res, next, error);
  }
};

exports.postFieldsOfStudy = async (req, res, next) => {
  const transaction = await db.sequelize.transaction();

  try {
    const fieldOfStudyToCreate = copyObjectHelper(req.body, ['name']);
    const createdFieldOfStudy = await fieldOfStudyService.createFieldOfStudy(transaction, fieldOfStudyToCreate.name);

    transaction.commit();
    return responseHelper(res, 201, 'Successfully created', createdFieldOfStudy);
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, next, error);
  }
};

exports.putFieldsOfStudy = async (req, res, next) => {
  const fieldOfStudyId = req.query.fieldOfStudyId;
  const transaction = await db.sequelize.transaction();

  try {
    if (!fieldOfStudyId) {
      throw new Error('No field of study given');
    }

    const fieldOfStudyToUpdate = copyObjectHelper(req.body, ['name']);
    const updatedFieldOfStudy = await fieldOfStudyService.updateFieldOfStudy(transaction, {
      fieldOfStudy_id: fieldOfStudyId,
      name: fieldOfStudyToUpdate.name,
    });

    if (!updatedFieldOfStudy) {
      throw new Error('No field of study found to update');
    }

    transaction.commit();
    return responseHelper(res, 200, 'Successfully updated', updatedFieldOfStudy);
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, next, error);
  }
};

exports.deleteFieldsOfStudy = async (req, res, next) => {
  const fieldOfStudyId = req.query.fieldOfStudyId;
  const transaction = await db.sequelize.transaction();

  try {
    if (!fieldOfStudyId) {
      throw new Error('No field of study given');
    }

    const deletedFieldOfStudy = await fieldOfStudyService.deleteFieldOfStudy(transaction, fieldOfStudyId);
    if (!deletedFieldOfStudy) {
      throw new Error('No field of study found to delete');
    }

    transaction.commit();
    return responseHelper(res, 200, 'Successfully deleted', deletedFieldOfStudy);
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, next, error);
  }
};
