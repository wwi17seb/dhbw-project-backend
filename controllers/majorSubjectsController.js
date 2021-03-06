const responseHelper = require('../helpers/responseHelper');
const errorResponseHelper = require('../helpers/errorResponseHelper');
const majorSubjectService = require('../services/majorSubjectService');
const fieldOfStudyService = require('../services/fieldOfStudyService');
const db = require('../database/database');
const copyObjectHelper = require('../helpers/propertyCopyHelper');

exports.getMajorSubjects = async (req, res) => {
  const fieldOfStudyId = req.query.fieldOfStudyId;

  try {
    if (!fieldOfStudyId) {
      throw new Error('No field of study given');
    }

    const fieldOfStudyWithMajorSubjects = await fieldOfStudyService.findFieldOfStudyById(fieldOfStudyId, true);
    if (!fieldOfStudyWithMajorSubjects) {
      throw new Error('Field of study could not be found');
    }

    return responseHelper(res, 200, 'Successful', {
      FieldOfStudy: {
        fieldOfStudy_id: fieldOfStudyWithMajorSubjects.fieldOfStudy_id,
        name: fieldOfStudyWithMajorSubjects.name,
      },
      MajorSubjects: fieldOfStudyWithMajorSubjects.MajorSubjects,
    });
  } catch (error) {
    return errorResponseHelper(res, error);
  }
};

exports.postMajorSubjects = async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    const majorSubjectToCreate = copyObjectHelper(req.body, ['fieldOfStudy_id', 'name', 'catalog_effective_from']);
    const createdMajorSubject = await majorSubjectService.createMajorSubject(
      transaction,
      majorSubjectToCreate.name,
      majorSubjectToCreate.fieldOfStudy_id,
      majorSubjectToCreate.catalog_effective_from
    );

    transaction.commit();
    return responseHelper(res, 201, 'Successfully created', createdMajorSubject);
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, error);
  }
};

exports.putMajorSubjects = async (req, res) => {
  const majorSubjectId = req.query.majorSubjectId;
  const transaction = await db.sequelize.transaction();

  try {
    if (!majorSubjectId) {
      throw new Error('No major subject given');
    }

    const majorSubjectToUpdate = copyObjectHelper(req.body, ['fieldOfStudy_id', 'name', 'catalog_effective_from']);
    const updatedMajorSubject = await majorSubjectService.updateMajorSubject(transaction, {
      majorSubject_id: majorSubjectId,
      name: majorSubjectToUpdate.name,
      fieldOfStudy_id: majorSubjectToUpdate.fieldOfStudy_id,
      catalog_effective_from: majorSubjectToUpdate.catalog_effective_from,
    });

    if (!updatedMajorSubject) {
      throw new Error('No major subject found to update');
    }

    transaction.commit();
    return responseHelper(res, 200, 'Successfully updated', updatedMajorSubject);
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, error);
  }
};

exports.deleteMajorSubjects = async (req, res) => {
  const majorSubjectId = req.query.majorSubjectId;
  const transaction = await db.sequelize.transaction();

  try {
    if (!majorSubjectId) {
      throw new Error('No major subject given');
    }

    const deletedMajorSubject = await majorSubjectService.deleteMajorSubject(transaction, majorSubjectId);
    if (!deletedMajorSubject) {
      throw new Error('No major subject found to delete');
    }

    transaction.commit();
    return responseHelper(res, 200, 'Successfully deleted', deletedMajorSubject);
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, error);
  }
};
