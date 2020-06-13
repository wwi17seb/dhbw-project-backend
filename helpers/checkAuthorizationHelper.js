const lecturerService = require('../services/lecturerService');
const courseService = require('../services/courseService');
const presentationService = require('../services/presentationService');
const semesterService = require('../services/semesterService');

exports.checkLecturerEditAuthorization = async function (directorOfStudies_id, lecturer_id) {
  const lecturerCheck = await lecturerService.findLecturerById(lecturer_id);
  return lecturerCheck.createdBy_id === directorOfStudies_id;
};

async function checkCourseEditAuthorization(directorOfStudies_id, course_id) {
  const courseCheck = await courseService.findCourseById(course_id);
  return (
    courseCheck.DirectorsOfStudies.find((dos) => {
      return dos.dataValues.directorOfStudies_id === directorOfStudies_id;
    }) !== undefined
  );
}
exports.checkCourseEditAuthorization = checkCourseEditAuthorization;

exports.checkPresentationEditAuthorization = async function (directorOfStudies_id, presentation_id) {
  const presentation = await presentationService.findPresentationById(presentation_id);
  const course_id = presentation.course_id;
  return await checkCourseEditAuthorization(directorOfStudies_id, course_id);
};

exports.checkSemesterEditAuthorization = async function (directorOfStudies_id, semester_id) {
  const semester = await semesterService.findSemesterById(semester_id);
  const course_id = semester.course_id;
  return await checkCourseEditAuthorization(directorOfStudies_id, course_id);
};
