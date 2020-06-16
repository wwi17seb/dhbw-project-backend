const responseHelper = require('../helpers/responseHelper');
const errorResponseHelper = require('../helpers/errorResponseHelper');
const majorSubjectService = require('../services/majorSubjectService');
const fieldOfStudyService = require('../services/fieldOfStudyService');
const db = require('../database/database');
const copyObjectHelper = require('../helpers/propertyCopyHelper');

exports.getMajorSubjects = async (req, res, next) => {
  const fieldOfStudyId = req.query.fieldOfStudyId;

  if (fieldOfStudyId) {
    try {
      const fieldOfStudyWithMajorSubjects = await fieldOfStudyService.findFieldOfStudyById(fieldOfStudyId, true);

      if (fieldOfStudyWithMajorSubjects) {
        return responseHelper(res, 200, 'Successful', {
          FieldOfStudy: {
            fieldOfStudy_id: fieldOfStudyWithMajorSubjects.fieldOfStudy_id,
            name: fieldOfStudyWithMajorSubjects.name,
          },
          MajorSubjects: fieldOfStudyWithMajorSubjects.MajorSubjects,
        });
      } else {
        return responseHelper(res, 404, 'Field of study does not exist');
      }
    } catch (error) {
      return errorResponseHelper(res, next, error);
    }
  } else {
    return responseHelper(res, 400, 'fieldOfStudyId cannot be empty');
  }
};

exports.postMajorSubjects = async (req, res, next) => {
  const transaction = await db.sequelize.transaction();

  try {
    const majorSubjectToCreate = copyObjectHelper(req.body, ['fieldOfStudy_id', 'name']);
    const createdMajorSubject = await majorSubjectService.createMajorSubject(
      transaction,
      majorSubjectToCreate.name,
      majorSubjectToCreate.fieldOfStudy_id
    );

    transaction.commit();
    return responseHelper(res, 201, 'Successfully created', createdMajorSubject);
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, next, error);
  }
};

exports.putMajorSubjects = async (req, res, next) => {
  const majorSubjectId = req.query.majorSubjectId;
  const transaction = await db.sequelize.transaction();

  try {
    if (!majorSubjectId) {
      throw new Error('No major subject given');
    }

    const majorSubjectToUpdate = copyObjectHelper(req.body, ['fieldOfStudy_id', 'name']);
    const updatedMajorSubject = await majorSubjectService.updateMajorSubject(transaction, {
      majorSubject_id: majorSubjectId,
      name: majorSubjectToUpdate.name,
      fieldOfStudy_id: majorSubjectToUpdate.fieldOfStudy_id,
    });

    if (!updatedMajorSubject) {
      throw new Error('No major subject found to update');
    }

    transaction.commit();
    return responseHelper(res, 200, 'Successfully updated', updatedMajorSubject);
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, next, error);
  }
};

exports.deleteMajorSubjects = async (req, res, next) => {
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
    return errorResponseHelper(res, next, error);
  }
};
