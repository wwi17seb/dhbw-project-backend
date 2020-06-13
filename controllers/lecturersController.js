const lecturerService = require('../services/lecturerService');
const db = require('../database/database');
const responseHelper = require('../helpers/responseHelper');
const copyObjectHelper = require('../helpers/propertyCopyHelper');
const { checkLecturerEditAuthorization } = require('../helpers/checkAuthorizationHelper');

exports.getLecturers = async (req, res, next) => {
  // TODO: add filter methods
  try {
    const curStudiesDirectorId = req.token.directorOfStudies_id;
    const lecturers = await lecturerService.findAllLecturer(curStudiesDirectorId);
    responseHelper(res, 200, 'Successful', { lecturers });
  } catch (error) {
    return next(error);
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
    return next(error);
  }
};

exports.putLecturers = async (req, res, next) => {
  const directorOfStudies_id = req.token.directorOfStudies_id;
  const lecturerId = req.query.lecturerId;
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

  const transaction = await db.sequelize.transaction();
  try {
    if (await checkLecturerEditAuthorization(directorOfStudies_id, lecturerId)) {
      const updatedLecturer = await lecturerService.updateLecturer(
        transaction,
        givenLecturer,
        lecturerId,
        directorOfStudies_id
      );
      transaction.commit();
      return responseHelper(res, 200, 'Successfully updated lecturer', updatedLecturer);
    } else {
      return responseHelper(res, 400, 'You are authorized to update the lecturer.');
    }
  } catch (error) {
    transaction.rollback();
    return next(error);
  }
};

exports.deleteLecturers = async (req, res, next) => {
  const directorOfStudies_id = req.token.directorOfStudies_id;
  const lecturerId = req.query.lecturerId;

  const transaction = await db.sequelize.transaction();
  try {
    if (await checkLecturerEditAuthorization(directorOfStudies_id, lecturerId)) {
      const deletedLecturer = await lecturerService.deleteLecturer(transaction, lecturerId);

      transaction.commit();
      return responseHelper(res, 200, 'Successfully deleted lecturer', deletedLecturer);
    } else {
      return responseHelper(res, 400, 'You are authorized to delete the lecturer.');
    }
  } catch (error) {
    transaction.rollback();
    return next(error);
  }
};
