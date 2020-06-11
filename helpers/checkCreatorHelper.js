const lecturerService = require('../services/lecturerService');

module.exports = async (transaction, lecturer_id, directorOfStudies_id) => {
  const lecturerCheck = await lecturerService.findLecturerById(lecturer_id, transaction);
  return lecturerCheck.createdBy_id === directorOfStudies_id;
};
