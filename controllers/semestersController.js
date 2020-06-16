const responseHelper = require('../helpers/responseHelper');
const errorResponseHelper = require('../helpers/errorResponseHelper');
const db = require('../database/database');
const semesterService = require('../services/semesterService');
const { checkSemesterEditAuthorization, checkCourseEditAuthorization } = require('../helpers/checkAuthorizationHelper');

exports.postSemesters = async (req, res, next) => {
  const directorOfStudiesId = req.token.directorOfStudies_id;
  const transaction = await db.sequelize.transaction();

  try {
    const SemesterToCreate = req.body;
    if (!(await checkCourseEditAuthorization(directorOfStudiesId, SemesterToCreate.course_id))) {
      transaction.rollback();
      return responseHelper(res, 403, 'You are not authorized to create this semester');
    }

    const createdSemester = await semesterService.createSemester(transaction, SemesterToCreate);

    transaction.commit();
    return responseHelper(res, 201, 'Successfully created', createdSemester);
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, next, error);
  }
};

exports.putSemesters = async (req, res, next) => {
  const semesterId = req.query.semesterId;
  const directorOfStudiesId = req.token.directorOfStudies_id;
  const transaction = await db.sequelize.transaction();

  try {
    if (!semesterId) {
      throw new Error('No semester given');
    }

    const semesterToUpdate = req.body;

    if (
      !(await checkSemesterEditAuthorization(directorOfStudiesId, semesterId)) ||
      !(await checkCourseEditAuthorization(directorOfStudiesId, semesterToUpdate.course_id))
    ) {
      transaction.rollback();
      return responseHelper(res, 403, 'You are not authorized to update this semester');
    }

    const updatedSemester = await semesterService.updateSemester(transaction, {
      ...semesterToUpdate,
      semester_id: semesterId,
    });
    if (!updatedSemester) {
      throw new Error('No semester found to update');
    }

    transaction.commit();
    return responseHelper(res, 200, 'Successfully updated', updatedSemester);
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, next, error);
  }
};

exports.deleteSemesters = async (req, res, next) => {
  const semesterId = req.query.semesterId;
  const directorOfStudiesId = req.token.directorOfStudies_id;
  const transaction = await db.sequelize.transaction();

  try {
    if (!semesterId) {
      throw new Error('No semester given');
    }

    if (!(await checkSemesterEditAuthorization(directorOfStudiesId, semesterId))) {
      transaction.rollback();
      return responseHelper(res, 403, 'You are not authorized to delete this semester');
    }

    const deletedSemester = await semesterService.deleteSemester(transaction, semesterId);
    if (!deletedSemester) {
      throw new Error('No semester found to delete');
    }

    transaction.commit();
    return responseHelper(res, 200, 'Successfully deleted', deletedSemester);
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, next, error);
  }
};
