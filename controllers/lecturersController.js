const responseHelper = require('../helpers/responseHelper');
const errorResponseHelper = require('../helpers/errorResponseHelper');
const lecturerService = require('../services/lecturerService');
const db = require('../database/database');
const copyObjectHelper = require('../helpers/propertyCopyHelper');
const { checkLecturerEditAuthorization } = require('../helpers/checkAuthorizationHelper');
const pdfService = require('../services/pdfService');

exports.getLecturers = async (req, res, next) => {
  // TODO: add filter methods
  try {
    const Lecturers = await lecturerService.findAllLecturers();

    responseHelper(res, 200, 'Successful', { Lecturers });
  } catch (error) {
    return errorResponseHelper(res, next, error);
  }
};

exports.getLecturerCV = async (req, res, next) => {
  const { lecturerId } = req.query;
  try {
    const pdf = await pdfService.getLecturerCV(lecturerId);

    responseHelper(res, 200, 'Successful', pdf);
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
    let cvFileContent = null;
    if (givenLecturer.cv) {
      cvFileContent = givenLecturer.cv;
      givenLecturer.cv = true;
    } else {
      givenLecturer.cv = false;
    }
    const createdLecturer = await lecturerService.createLecturer(transaction, givenLecturer, directorOfStudies_id);
    await pdfService.updateLecturerCV(createdLecturer.lecturer_id, cvFileContent);

    transaction.commit();
    responseHelper(res, 201, 'Successfully created', createdLecturer);
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
      throw new Error('You are not authorized to update this lecturer');
    }

    let cvFileContent = null;
    if (givenLecturer.cv) {
      cvFileContent = givenLecturer.cv;
      givenLecturer.cv = true;
    } else {
      givenLecturer.cv = false;
    }

    const [updatedLecturer] = await Promise.all([
      lecturerService.updateLecturer(transaction, givenLecturer, lecturerId, directorOfStudies_id),
      pdfService.updateLecturerCV(lecturerId, cvFileContent),
    ]);
    if (!updatedLecturer) {
      throw new Error('No Lecturer found to update');
    }

    transaction.commit();
    return responseHelper(res, 200, 'Successfully updated', updatedLecturer);
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
    return errorResponseHelper(res, next, error);
  }
};
