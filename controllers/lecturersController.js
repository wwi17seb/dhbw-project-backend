const lecturersService = require('../services/lecturerService');
const authService = require('../services/authService');

const responseHelper = require('../helpers/responseHelper');
const copyObjectHelper = require('../helpers/propertyCopyHelper');

exports.getLecturers = async (req, res, next) => {
  responseHelper(res, 501, 'Not yet implemented.');
};

exports.postLecturers = async (req, res, next) => {
  // const givenLecturer = copyObjectHelper(req.body, "firstname", "lastname", "academic_title", "email", "salutation", "phonenumber", "experience", "comment", "is_ex")
  const { firstname, lastname, academic_title, email, salutation, phonenumber, experience, comment, is_extern } = req.body;

  let givenLecturer = {
    firstname,
    lastname,
    academic_title,
    email,
    salutation,
    phonenumber,
    experience,
    comment,
    is_extern,
  };

  try {
    const curStudiesDirectorId = req.token.userId;
    const createdLecturer = await lecturersService.createLecturers(givenLecturer, curStudiesDirectorId);
    responseHelper(res, 201, 'Successfully created lecturer', createdLecturer);
  } catch (error) {
    responseHelper(res, 400, 'Could not create lecturer');
  }
};

exports.putLecturers = async (req, res, next) => {
  responseHelper(res, 501, 'Not yet implemented.');
};

exports.deleteLecturers = async (req, res, next) => {
  responseHelper(res, 501, 'Not yet implemented.');
};
