const responseHelper = require('../helpers/responseHelper');
const courseService = require('../services/courseService');
const copyObjectHelper = require('../helpers/propertyCopyHelper');
const db = require('../database/database');

// TODO: remove error as soon as they are implemented.

const throwError = () => {
  throw false;
};

exports.getCourses = async (req, res) => {
  const directorOfStudiesId = req.token.userId;
  try {
    // find all to current dos
    const courses = await courseService.findAll(true, true, false, directorOfStudiesId);
    responseHelper(res, 200, { courses });
  } catch (error) {
    responseHelper(res, 500, 'Internal Server Error.');
  }
};

exports.postCourses = async (req, res) => {
  const directorOfStudiesId = req.token.userId;

  let transaction = await db.sequelize.transaction();
  try {
    let courseToCreate = copyObjectHelper(req.body, ['name', 'majorSubject_id', 'directorOfStudy_ids', 'semesters']);

    if (!courseToCreate.directorOfStudy_ids) {
      courseToCreate.directorOfStudy_ids = [];
    }
    courseToCreate.directorOfStudy_ids.push(directorOfStudiesId);

    let createdCourse = await courseService.createCourse(transaction, { ...courseToCreate }, true, true);

    transaction.commit();

    return responseHelper(res, 201, 'Successfully created.', createdCourse);
  } catch (error) {
    transaction.rollback();
    return responseHelper(res, 500, 'Internal Server Error.');
  }
};

exports.putCourses = async (req, res) => {
  // TODO: security: only if courseId belongs to DoS
  const courseId = req.query.courseId;
  const directorOfStudiesId = req.token.userId;

  let transaction = await db.sequelize.transaction();

  try {
    let courseToUpdate = copyObjectHelper(req.body, ['name', 'majorSubject_id', 'directorOfStudy_ids']);

    if (!courseToUpdate.directorOfStudy_ids) {
      courseToUpdate.directorOfStudy_ids = [];
    }
    courseToUpdate.directorOfStudy_ids.push(directorOfStudiesId);

    let updatedCourse = await courseService.updateCourse(transaction, { courseId, ...courseToUpdate });

    transaction.commit();

    return responseHelper(res, 200, 'Successfully updated.', updatedCourse);
  } catch (error) {
    transaction.rollback();
    return responseHelper(res, 500, 'Internal Server Error.');
  }
};

exports.deleteCourses = async (req, res) => {
  // TODO: security: only if courseId belongs to DoS
  const courseId = req.query.courseId;
  const directorOfStudiesId = req.token.userId;

  let transaction = await db.sequelize.transaction();

  try {
    let deletedCourse = await courseService.deleteCourse(transaction, courseId);

    transaction.commit();

    return responseHelper(res, 200, 'Successfully deleted.', deletedCourse);
  } catch (error) {
    transaction.rollback();
    return responseHelper(res, 500, 'Internal Server Error.');
  }
};
