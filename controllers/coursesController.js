const responseHelper = require('../helpers/responseHelper');
const errorResponseHelper = require('../helpers/errorResponseHelper');
const courseService = require('../services/courseService');
const copyObjectHelper = require('../helpers/propertyCopyHelper');
const db = require('../database/database');
const { checkCourseEditAuthorization } = require('../helpers/checkAuthorizationHelper');

exports.getCourses = async (req, res) => {
  const directorOfStudiesId = req.token.directorOfStudies_id;

  try {
    const Courses = (await courseService.findAll()).filter((course) => {
      return Boolean(
        course.DirectorsOfStudies.find((dos) => {
          return dos.directorOfStudies_id === directorOfStudiesId;
        })
      );
    });

    responseHelper(res, 200, 'Successful', { Courses });
  } catch (error) {
    return errorResponseHelper(res, error);
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

exports.postCourses = async (req, res) => {
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
    return responseHelper(res, 201, 'Successfully created', createdCourse);
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, error);
  }
};

exports.putCourses = async (req, res) => {
  const course_id = req.query.courseId;
  const directorOfStudiesId = req.token.directorOfStudies_id;
  const transaction = await db.sequelize.transaction();

  try {
    if (!course_id) {
      throw new Error('No course given');
    }
    if (!(await checkCourseEditAuthorization(directorOfStudiesId, course_id))) {
      throw new Error('You are not authorized to update this course');
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
    if (!updatedCourse) {
      throw new Error('No course found to update');
    }

    transaction.commit();
    return responseHelper(res, 200, 'Successfully updated', updatedCourse);
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, error);
  }
};

exports.deleteCourses = async (req, res) => {
  const courseId = req.query.courseId;
  const directorOfStudiesId = req.token.directorOfStudies_id;
  const transaction = await db.sequelize.transaction();

  try {
    if (!courseId) {
      throw new Error('No course given');
    }
    if (!(await checkCourseEditAuthorization(directorOfStudiesId, courseId))) {
      throw new Error('You are not authorized to delete this course');
    }

    const deletedCourse = await courseService.deleteCourse(transaction, courseId);
    if (!deletedCourse) {
      throw new Error('No course found to delete');
    }

    transaction.commit();
    return responseHelper(res, 200, 'Successfully deleted', deletedCourse);
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, error);
  }
};
