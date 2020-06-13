const responseHelper = require('../helpers/responseHelper');
const courseService = require('../services/courseService');
const copyObjectHelper = require('../helpers/propertyCopyHelper');
const db = require('../database/database');
const { checkCourseEditAuthorization } = require('../helpers/checkAuthorizationHelper');

exports.getCourses = async (req, res, next) => {
  const directorOfStudiesId = req.token.directorOfStudies_id;
  try {
    const Courses = await courseService.findAll(true, true, false, directorOfStudiesId);
    responseHelper(res, 200, 'Successful', { Courses });
  } catch (error) {
    return next(error);
  }
};

function getDirectorsOfStudiesArray(dosArray, currentDoS) {
  if (!dosArray) {
    dosArray = [];
  }
  if (!dosArray.includes(currentDoS)) {
    dosArray.push(currentDoS);
  }
  return dosArray;
}

exports.postCourses = async (req, res, next) => {
  const directorOfStudiesId = req.token.directorOfStudies_id;

  const transaction = await db.sequelize.transaction();
  try {
    const courseToCreate = copyObjectHelper(req.body, [
      'name',
      'majorSubject_id',
      'google_calendar_id',
      'directorOfStudies_ids',
      'Semesters',
    ]);

    courseToCreate.directorOfStudies_ids = getDirectorsOfStudiesArray(
      courseToCreate.directorOfStudies_ids,
      directorOfStudiesId
    );
    const createdCourse = await courseService.createCourse(transaction, { ...courseToCreate });

    transaction.commit();

    return responseHelper(res, 201, 'Successfully created.', createdCourse);
  } catch (error) {
    transaction.rollback();
    return next(error);
  }
};

exports.putCourses = async (req, res, next) => {
  const course_id = req.query.courseId;
  const directorOfStudiesId = req.token.directorOfStudies_id;

  const transaction = await db.sequelize.transaction();

  try {
    if (!(await checkCourseEditAuthorization(directorOfStudiesId, course_id))) {
      transaction.rollback();
      return responseHelper(res, 403, 'You are not authorized to update this course.');
    }
    const courseToUpdate = copyObjectHelper(req.body, [
      'name',
      'majorSubject_id',
      'directorOfStudies_ids',
      'google_calendar_id',
    ]);

    courseToUpdate.directorOfStudies_ids = getDirectorsOfStudiesArray(
      courseToUpdate.directorOfStudies_ids,
      directorOfStudiesId
    );

    const updatedCourse = await courseService.updateCourse(transaction, { course_id, ...courseToUpdate });

    transaction.commit();

    return responseHelper(res, 200, 'Successfully updated.', updatedCourse);
  } catch (error) {
    transaction.rollback();
    return next(error);
  }
};

exports.deleteCourses = async (req, res, next) => {
  const courseId = req.query.courseId;
  const directorOfStudiesId = req.token.directorOfStudies_id;

  const transaction = await db.sequelize.transaction();

  try {
    if (!(await checkCourseEditAuthorization(directorOfStudiesId, courseId))) {
      transaction.rollback();
      return responseHelper(res, 400, 'You are not authorized to delete this course.');
    }
    const deletedCourse = await courseService.deleteCourse(transaction, courseId);

    transaction.commit();

    return responseHelper(res, 200, 'Successfully deleted.', deletedCourse);
  } catch (error) {
    transaction.rollback();
    return next(error);
  }
};
