const lecturerService = require('../services/lecturerService');
const db = require('../database/database');
const responseHelper = require('../helpers/responseHelper');
const copyObjectHelper = require('../helpers/propertyCopyHelper');

exports.getLecturers = async (req, res) => {
  try {
    const curStudiesDirectorId = req.token.userId;
    const lecturers = await lecturersService.findByDirectorOfStudiesId(curStudiesDirectorId);
    responseHelper(res, 200, '', { lecturers });
  } catch (error) {
    return next(error);
  }
};

exports.postLecturers = async (req, res) => {
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
    'is_extern', // TODO: add "mainFocus"
  ]);
  givenLecturer.is_extern = givenLecturer.is_extern !== 0;

  let transaction = await db.sequelize.transaction();
  try {
    const curStudiesDirectorId = req.token.userId;
    const createdLecturer = await lecturerService.createLecturer(transaction, givenLecturer, curStudiesDirectorId);
    transaction.commit();
    responseHelper(res, 201, 'Successfully created lecturer', createdLecturer);
  } catch (error) {
    transaction.rollback();
    return next(error);
  }
};

exports.putLecturers = async (req, res) => {
  responseHelper(res, 501, 'Not yet implemented.');
};

exports.deleteLecturers = async (req, res) => {
  responseHelper(res, 501, 'Not yet implemented.');
};
