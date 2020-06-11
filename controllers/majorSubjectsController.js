const responseHelper = require('../helpers/responseHelper');
const majorSubjectService = require('../services/majorSubjectService');
const fieldOfStudyService = require('../services/fieldOfStudyService');
const db = require('../database/database');
const copyObjectHelper = require('../helpers/propertyCopyHelper');

exports.getMajorSubjects = async (req, res) => {
  const fieldOfStudyId = req.query.fieldOfStudyId;

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
      return responseHelper(res, 404, 'Not Found');
    }
  } catch (error) {
    transaction.rollback();
    return next(error);
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
    return next(error);
  }
};

exports.putMajorSubjects = async (req, res, next) => {
  const transaction = await db.sequelize.transaction();

  try {
    const majorSubjectId = req.query.majorSubjectId;
    const majorSubjectToUpdate = copyObjectHelper(req.body, ['fieldOfStudy_id', 'name']);

    const updatedMajorSubject = await majorSubjectService.updateMajorSubject(transaction, {
      majorSubject_id: majorSubjectId,
      name: majorSubjectToUpdate.name,
      fieldOfStudy_id: majorSubjectToUpdate.fieldOfStudy_id,
    });
    transaction.commit();
    return responseHelper(res, 200, 'Successfully updated', updatedMajorSubject);
  } catch (error) {
    transaction.rollback();
    return next(error);
  }
};

exports.deleteMajorSubjects = async (req, res, next) => {
  const majorSubjectId = req.query.majorSubjectId;
  const transaction = await db.sequelize.transaction();

  try {
    const deleteMajorSubject = await majorSubjectService.deleteMajorSubject(transaction, majorSubjectId);
    transaction.commit();
    return responseHelper(res, 200, 'Successfully deleted');
  } catch (error) {
    transaction.rollback();
    return next(error);
  }
};
