const lecturerService = require('../services/lecturerService');
const courseService = require('../services/courseService');
const presentationService = require('../services/presentationService');
const semesterService = require('../services/semesterService');

exports.checkLecturerEditAuthorization = async function (directorOfStudies_id, lecturer_id) {
  const lecturer = await lecturerService.findLecturerById(lecturer_id);
  if (!lecturer) {
    throw new Error('Lecturer could not be found');
  }
  return lecturer.createdBy_id === directorOfStudies_id;
};

async function checkCourseEditAuthorization(directorOfStudies_id, course_id) {
  const course = await courseService.findCourseById(course_id);
  if (!course) {
    throw new Error('Course could not be found');
  }
  return (
    course.DirectorsOfStudies.find((dos) => {
      return dos.dataValues.directorOfStudies_id === directorOfStudies_id;
    }) !== undefined
  );
}
exports.checkCourseEditAuthorization = checkCourseEditAuthorization;

exports.checkPresentationEditAuthorization = async function (directorOfStudies_id, presentation_id) {
  const presentation = await presentationService.findPresentationById(presentation_id);
  if (!presentation) {
    throw new Error('Presentation could not be found');
  }
  const course_id = presentation.course_id;
  return await checkCourseEditAuthorization(directorOfStudies_id, course_id);
};

exports.checkSemesterEditAuthorization = async function (directorOfStudies_id, semester_id) {
  const semester = await semesterService.findSemesterById(semester_id);
  if (!semester) {
    throw new Error('Semester could not be found');
  }
  const course_id = semester.course_id;
  return await checkCourseEditAuthorization(directorOfStudies_id, course_id);
};
