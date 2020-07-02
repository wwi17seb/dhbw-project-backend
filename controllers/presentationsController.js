const responseHelper = require('../helpers/responseHelper');
const errorResponseHelper = require('../helpers/errorResponseHelper');
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
  const lecturer_id = req.query.lecturerId;
  const get_co_lecturers = req.query.getCoLecturers;
  const directorOfStudiesId = req.token.directorOfStudies_id;

  try {
    if (!course_id && !lecturer_id) {
      throw new Error('No required filter given');
    }
    if (lecturer_id && course_id) {
      throw new Error('Can not filter by course and lecturer at the same time');
    }
    let Presentations, Dos;
    if (course_id) {
      if (!(await checkCourseEditAuthorization(directorOfStudiesId, course_id))) {
        throw new Error('You are not authorized to view presentations of this course');
      }
      [Presentations, DoS] = await Promise.all([
        presentationService.findAll(course_id, semester_id),
        directorOfStudiesService.getById(directorOfStudiesId),
      ]);
    } else if (get_co_lecturers) {
      [Presentations, DoS] = await Promise.all([
        presentationService.findPresentationsByLecturerIdWithCoLecturer(lecturer_id),
        directorOfStudiesService.getById(directorOfStudiesId),
      ]);
    } else {
      [Presentations, DoS] = await Promise.all([
        presentationService.findPresentationsByLecturerId(lecturer_id),
        directorOfStudiesService.getById(directorOfStudiesId),
      ]);
    }

    Presentations = Presentations.map((presentation) => {
      presentation.createdBy = presentation.DirectorOfStudies;
      presentation.DirectorOfStudies = DoS;
      return presentation;
    });

    return responseHelper(res, 200, 'Successful', { Presentations });
  } catch (error) {
    return errorResponseHelper(res, next, error);
  }
};

exports.postPresentations = async (req, res, next) => {
  const directorOfStudiesId = req.token.directorOfStudies_id;
  const transaction = await db.sequelize.transaction();

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
      throw new Error('You are not authorized to create this presentation');
    }

    const createdPresentation = await presentationService.createPresentation(transaction, {
      ...presentationToCreate,
      directorOfStudies_id: directorOfStudiesId,
    });

    transaction.commit();
    return responseHelper(res, 201, 'Successfully created', createdPresentation);
  } catch (error) {
    transaction.rollback();

    return errorResponseHelper(res, next, error);
  }
};

exports.putPresentations = async (req, res, next) => {
  const presentationId = req.query.presentationId;
  const directorOfStudiesId = req.token.directorOfStudies_id;
  const transaction = await db.sequelize.transaction();

  try {
    if (!presentationId) {
      throw new Error('No presentation given');
    }

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
      throw new Error('You are not authorized to update this presentation');
    }

    const updatedPresentation = await presentationService.updatePresentation(transaction, {
      presentation_id: presentationId,
      ...presentationToUpdate,
      directorOfStudies_id: directorOfStudiesId,
    });

    if (!updatedPresentation) {
      throw new Error('No presentation found to update');
    }

    transaction.commit();
    return responseHelper(res, 200, 'Successfully updated', updatedPresentation);
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, next, error);
  }
};

exports.deletePresentations = async (req, res, next) => {
  const presentationId = req.query.presentationId;
  const directorOfStudiesId = req.token.directorOfStudies_id;
  const transaction = await db.sequelize.transaction();

  try {
    if (!presentationId) {
      throw new Error('No presentation given');
    }

    if (!(await checkPresentationEditAuthorization(directorOfStudiesId, presentationId))) {
      throw new Error('You are not authorized to delete this presentation');
    }

    const deletedPresentation = await presentationService.deletePresentation(transaction, presentationId);
    if (!deletedPresentation) {
      throw new Error('No presentation found to delete');
    }

    transaction.commit();
    return responseHelper(res, 200, 'Successfully deleted', deletedPresentation);
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, next, error);
  }
};
