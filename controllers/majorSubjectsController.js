const responseHelper = require('../helpers/responseHelper');
const majorSubjectService = require('../services/majorSubjectService');
const fieldOfStudyService = require('../services/fieldOfStudyService');
const db = require('../database/database');
const copyObjectHelper = require('../helpers/propertyCopyHelper');

exports.getMajorSubjects = async (req, res) => {
  const fieldOfStudyId = req.query.fieldOfStudyId;
  const fieldOfStudyWithMajorSubjects = await fieldOfStudyService.findFieldOfStudyById(fieldOfStudyId, true);
  responseHelper(res, 200, 'Successful', {
    FieldOfStudy: {
      fieldOfStudy_id: fieldOfStudyWithMajorSubjects.fieldOfStudy_id,
      name: fieldOfStudyWithMajorSubjects.name,
    },
    MajorSubjects: fieldOfStudyWithMajorSubjects.MajorSubjects,
  });
};

exports.postMajorSubjects = async (req, res) => {
  let transaction = await db.sequelize.transaction();
  try {
    let majorSubjectToCreate = copyObjectHelper(req.body, ['fieldOfStudy_id', 'name']);
    let createdMajorSubject = await majorSubjectService.createMajorSubject(
      transaction,
      majorSubjectToCreate.name,
      majorSubjectToCreate.fieldOfStudy_id
    );
    transaction.commit();
    return responseHelper(res, 201, 'Successfully created', createdMajorSubject);
  } catch (error) {
    console.log(error);
    transaction.rollback();
    return responseHelper(res, 500, 'Internal Server Error.');
  }
};

exports.putMajorSubjects = async (req, res) => {
  let transaction = await db.sequelize.transaction();
  try {
    const majorSubjectId = req.query.majorSubjectId;
    let majorSubjectToUpdate = copyObjectHelper(req.body, ['fieldOfStudy_id', 'name']);
    let updatedMajorSubject = await majorSubjectService.updateMajorSubject(transaction, {
      majorSubject_id: majorSubjectId,
      name: majorSubjectToUpdate.name,
      fieldOfStudy_id: majorSubjectToUpdate.fieldOfStudy_id,
    });
    transaction.commit();
    return responseHelper(res, 200, 'Successfully updated', updatedMajorSubject);
  } catch (error) {
    transaction.rollback();
    return responseHelper(res, 500, 'Internal Server Error.');
  }
};

exports.deleteMajorSubjects = async (req, res) => {
  const majorSubjectId = req.query.majorSubjectId;
  let transaction = await db.sequelize.transaction();
  try {
    let deleteMajorSubject = await majorSubjectService.deleteMajorSubject(transaction, majorSubjectId);
    transaction.commit();
    return responseHelper(res, 200, 'Successfully deleted');
  } catch (error) {
    transaction.rollback();
    return responseHelper(res, 500, 'Internal Server Error');
  }
};
