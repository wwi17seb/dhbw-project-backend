const responseHelper = require('../helpers/responseHelper');
const db = require('../database/database');
const copyObjectHelper = require('../helpers/propertyCopyHelper');
const presentationService = require('../services/presentationService');
const directorOfStudiesService = require('../services/directorOfStudiesService');
const {
  checkPresentationEditAuthorization,
  checkCourseEditAuthorization,
} = require('../helpers/checkAuthorizationHelper');

exports.getPresentations = async (req, res, next) => {
  const course_id = req.query.courseId;
  const semester_id = req.query.semesterId;
  const directorOfStudiesId = req.token.directorOfStudies_id;

  try {
    if (!(await checkCourseEditAuthorization(directorOfStudiesId, course_id))) {
      transaction.rollback();
      return responseHelper(res, 403, 'You are not authorized to view presentations of this course');
    }
    let [Presentations, DoS] = await Promise.all([
      presentationService.findAll(course_id, semester_id),
      directorOfStudiesService.getById(directorOfStudiesId),
    ]);
    Presentations = Presentations.map((presentation) => {
      presentation.createdBy = presentation.DirectorOfStudies;
      presentation.DirectorOfStudies = DoS;
      return presentation;
    });
    return responseHelper(res, 200, 'Successful', { Presentations });
  } catch (error) {
    return next(error);
  }
};

exports.postPresentations = async (req, res, next) => {
  const transaction = await db.sequelize.transaction();
  const directorOfStudiesId = req.token.directorOfStudies_id;

  try {
    const presentationToCreate = copyObjectHelper(req.body, [
      'lecture_id',
      'lecturer_id',
      'academicRecord_id',
      'semester_id',
      'course_id',
      'status',
    ]);
    if (!(await checkCourseEditAuthorization(directorOfStudiesId, presentationToCreate.course_id))) {
      transaction.rollback();
      return responseHelper(res, 403, 'You are not authorized to create this presentation');
    }

    const createdPresentation = await presentationService.createPresentation(transaction, {
      ...presentationToCreate,
      directorOfStudies_id: directorOfStudiesId,
    });
    transaction.commit();

    return responseHelper(res, 201, 'Successfully created', createdPresentation);
  } catch (error) {
    transaction.rollback();

    return next(error);
  }
};

exports.putPresentations = async (req, res, next) => {
  const transaction = await db.sequelize.transaction();
  const presentationId = req.query.presentationId;
  const directorOfStudiesId = req.token.directorOfStudies_id;

  try {
    const presentationToUpdate = copyObjectHelper(req.body, [
      'lecture_id',
      'lecturer_id',
      'academicRecord_id',
      'semester_id',
      'course_id',
      'status',
    ]);

    if (
      !(await checkPresentationEditAuthorization(directorOfStudiesId, presentationId)) ||
      !(await checkCourseEditAuthorization(directorOfStudiesId, presentationToUpdate.course_id))
    ) {
      transaction.rollback();
      return responseHelper(res, 403, 'You are not authorized to update this presentation');
    }

    const updatedPresentation = await presentationService.updatePresentation(transaction, {
      presentation_id: presentationId,
      ...presentationToUpdate,
      directorOfStudies_id: directorOfStudiesId,
    });
    transaction.commit();

    return responseHelper(res, 200, 'Successfully updated', updatedPresentation);
  } catch (error) {
    transaction.rollback();

    return next(error);
  }
};

exports.deletePresentations = async (req, res, next) => {
  const transaction = await db.sequelize.transaction();
  const presentationId = req.query.presentationId;
  const directorOfStudiesId = req.token.directorOfStudies_id;

  try {
    if (!(await checkPresentationEditAuthorization(directorOfStudiesId, presentationId))) {
      transaction.rollback();
      return responseHelper(res, 403, 'You are not authorized to delete this presentation');
    }

    const deletedPresentation = await presentationService.deletePresentation(transaction, presentationId);
    transaction.commit();

    return responseHelper(res, 200, 'Successfully deleted', deletedPresentation);
  } catch (error) {
    transaction.rollback();

    return next(error);
  }
};
