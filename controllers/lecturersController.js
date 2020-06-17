const responseHelper = require('../helpers/responseHelper');
const errorResponseHelper = require('../helpers/errorResponseHelper');
const lecturerService = require('../services/lecturerService');
const db = require('../database/database');
const copyObjectHelper = require('../helpers/propertyCopyHelper');
const { checkLecturerEditAuthorization } = require('../helpers/checkAuthorizationHelper');

exports.getLecturers = async (req, res, next) => {
  // TODO: add filter methods
  try {
    const curStudiesDirectorId = req.token.directorOfStudies_id;
    const lecturers = await lecturerService.findAllLecturers(curStudiesDirectorId);

    responseHelper(res, 200, 'Successful', { lecturers });
  } catch (error) {
    return errorResponseHelper(res, next, error);
  }
};

exports.postLecturers = async (req, res, next) => {
  const transaction = await db.sequelize.transaction();
  const directorOfStudies_id = req.token.directorOfStudies_id;
  const givenLecturer = copyObjectHelper(req.body, [
    'firstname',
    'lastname',
    'academic_title',
    'email',
    'salutation',
    'phonenumber',
    'experience',
    'profile',
    'research',
    'cv',
    'comment',
    'is_extern',
    'mainFocus_ids',
  ]);

  try {
    const createdLecturer = await lecturerService.createLecturer(transaction, givenLecturer, directorOfStudies_id);

    transaction.commit();
    responseHelper(res, 201, 'Successfully created lecturer', createdLecturer);
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, next, error);
  }
};

exports.putLecturers = async (req, res, next) => {
  const directorOfStudies_id = req.token.directorOfStudies_id;
  const lecturerId = req.query.lecturerId;
  const transaction = await db.sequelize.transaction();
  const givenLecturer = copyObjectHelper(req.body, [
    'firstname',
    'lastname',
    'academic_title',
    'email',
    'salutation',
    'phonenumber',
    'experience',
    'profile',
    'research',
    'cv',
    'comment',
    'is_extern',
    'mainFocus_ids',
  ]);

  try {
    if (!lecturerId) {
      throw new Error('No lecturer given');
    }

    if (!(await checkLecturerEditAuthorization(directorOfStudies_id, lecturerId))) {
      return responseHelper(res, 400, 'You are not authorized to update the lecturer.');
    }

    const updatedLecturer = await lecturerService.updateLecturer(
      transaction,
      givenLecturer,
      lecturerId,
      directorOfStudies_id
    );
    if (!updatedLecturer) {
      throw new Error('No Lecturer found to update');
    }

    transaction.commit();
    return responseHelper(res, 200, 'Successfully updated lecturer', updatedLecturer);
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, next, error);
  }
};

exports.deleteLecturers = async (req, res, next) => {
  const directorOfStudies_id = req.token.directorOfStudies_id;
  const lecturerId = req.query.lecturerId;
  const transaction = await db.sequelize.transaction();

  try {
    if (!lecturerId) {
      throw new Error('No lecturer given');
    }

    if (!(await checkLecturerEditAuthorization(directorOfStudies_id, lecturerId))) {
      return responseHelper(res, 400, 'You are not authorized to delete the lecturer.');
    }

    const deletedLecturer = await lecturerService.deleteLecturer(transaction, lecturerId);
    if (!deletedLecturer) {
      throw new Error('No lecturer found to delete');
    }

    transaction.commit();
    return responseHelper(res, 200, 'Successfully deleted lecturer', deletedLecturer);
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, next, error);
  }
};
