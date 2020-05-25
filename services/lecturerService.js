const db = require('../database/database');
const directorOfStudiesService = require('./directorOfStudiesService');

/*
 * Returns founded lecturer
 */
module.exports.findLecturerById = async (lecturerId) => {
  const lecturer = await db.Lecturer.findOne({ where: { id: lecturerId } }, transaction);
  return lecturer;
};

/*
 * Returns founded lecturer
 */
module.exports.findLecturerByName = async ({ lastname, firstname }, withFirstname, withLastname) => {
  const searchParams = {};
  if (withFirstname) searchParams.firstname = firstname;
  if (withLastname) searchParams.lastname = lastname;
  const lecturer = await db.Lecturer.findOne({ where: searchParams }, transaction);
  return lecturer;
};

/*
 * Receives  directorOfStudiesId
 *
 * Returns founded lecturers []
 */
module.exports.findByDirectorOfStudiesId = async (directorOfStudiesId) => {
  const lecturers = await db.Lecturer.find({ where: { directorOfStudies_id: directorOfStudiesId } });
  return lecturers.dataValues;
};

/*
 * directorOfStudiesId represents the director of studies adding the new lecturer
 *
 * Returns created lecturer
 */
module.exports.createLecturer = async (transaction, lecturer, directorOfStudiesId, isDirectorOfStudies) => {
  let whatToinclude = [];
  let directorOfStudies = {};
  if (isDirectorOfStudies) {
    directorOfStudies = await directorOfStudiesService.findDirectorOfStudiesById(directorOfStudiesId);
    whatToinclude.push({ model: db.DirectorOfStudies });
  }
  try {
    const createdLecturer = await db.Lecturer.create(
      { ...lecturer, createdBy_id: directorOfStudiesId, directorOfStudies },
      { include: whatToinclude },
      transaction
    );

    return createdLecturer.dataValues;
  } catch (error) {
    console.log('createLecturer', error);
    transaction.rollback();
  }
};
