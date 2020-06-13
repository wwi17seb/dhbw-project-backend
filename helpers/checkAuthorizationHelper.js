const lecturerService = require('../services/lecturerService');
const courseService = require('../services/courseService');

exports.checkLecturerEditAuthorization = async function (directorOfStudies_id, lecturer_id) {
  const lecturerCheck = await lecturerService.findLecturerById(lecturer_id);
  return lecturerCheck.createdBy_id === directorOfStudies_id;
};

exports.checkCourseEditAuthorization = async function (directorOfStudies_id, course_id) {
  const courseCheck = await courseService.findCourseById(course_id);
  return (
    courseCheck.DirectorsOfStudies.find((dos) => {
      dos.directorOfStudies_id === directorOfStudies_id;
    }) !== null
  );
};
