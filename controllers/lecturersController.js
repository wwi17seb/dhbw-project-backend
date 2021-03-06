const responseHelper = require('../helpers/responseHelper');
const errorResponseHelper = require('../helpers/errorResponseHelper');
const lecturerService = require('../services/lecturerService');
const db = require('../database/database');
const copyObjectHelper = require('../helpers/propertyCopyHelper');
const { checkLecturerEditAuthorization } = require('../helpers/checkAuthorizationHelper');
const pdfService = require('../services/pdfService');

exports.getLecturers = async (req, res) => {
  // TODO: add filter methods
  try {
    const Lecturers = await lecturerService.findAllLecturers();

    responseHelper(res, 200, 'Successful', { Lecturers });
  } catch (error) {
    return errorResponseHelper(res, error);
  }
};

exports.postLecturers = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  const directorOfStudies_id = req.token.directorOfStudies_id;
  const givenLecturer = copyObjectHelper(req.body, [
    'firstname',
    'lastname',
    'academic_title',
    'email',
    'salutation',
    'phonenumber',
    'profile',
    'research',
    'comment',
    'possible_lectures',
    'is_extern',
    'mainFocus_ids',
    'allow_manipulation',
  ]);

  try {
    const createdLecturer = await lecturerService.createLecturer(transaction, givenLecturer, directorOfStudies_id);

    transaction.commit();
    responseHelper(res, 201, 'Successfully created', createdLecturer);
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, error);
  }
};

exports.putLecturers = async (req, res) => {
  const lecturerId = req.query.lecturerId;
  const { directorOfStudies_id } = req.token;
  const transaction = await db.sequelize.transaction();
  const givenLecturer = copyObjectHelper(req.body, [
    'firstname',
    'lastname',
    'academic_title',
    'email',
    'salutation',
    'phonenumber',
    'profile',
    'research',
    'comment',
    'possible_lectures',
    'is_extern',
    'mainFocus_ids',
    'allow_manipulation',
  ]);

  try {
    if (!lecturerId) {
      throw new Error('No lecturer given');
    }

    if (!(await checkLecturerEditAuthorization(directorOfStudies_id, lecturerId))) {
      throw new Error('You are not authorized to update this lecturer');
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
    return responseHelper(res, 200, 'Successfully updated', updatedLecturer);
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, error);
  }
};

exports.deleteLecturers = async (req, res) => {
  const lecturerId = req.query.lecturerId;
  const { directorOfStudies_id } = req.token;
  const transaction = await db.sequelize.transaction();

  try {
    if (!lecturerId) {
      throw new Error('No lecturer given');
    }

    if (!(await checkLecturerEditAuthorization(directorOfStudies_id, lecturerId))) {
      throw new Error('You are not authorized to delete this lecturer');
    }

    const [deletedLecturer] = await Promise.all([
      lecturerService.deleteLecturer(transaction, lecturerId),
      pdfService.deleteLecturerCV(lecturerId),
    ]);
    if (!deletedLecturer) {
      throw new Error('No lecturer found to delete');
    }

    transaction.commit();
    return responseHelper(res, 200, 'Successfully deleted', deletedLecturer);
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, error);
  }
};
