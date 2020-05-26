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
module.exports.createLecturer = async (
  transaction,
  { lecturerId, academic_title, firstname, lastname, email, salutation, phonenumber, experience, rating, is_extern, profile, cv, research },
  directorOfStudiesId,
  isDirectorOfStudies
) => {
  const lecturerToCreate = {
    lecturerId,
    academic_title,
    firstname,
    lastname,
    email,
    salutation,
    phonenumber,
    experience,
    rating,
    is_extern,
    profile,
    cv,
    research,
  };
  const createdLecturer = await db.Lecturer.create({ ...lecturerToCreate, createdBy_id: directorOfStudiesId });
  if (isDirectorOfStudies) {
    const directorOfStudies = await directorOfStudiesService.findDirectorOfStudiesById(directorOfStudiesId);
    await directorOfStudies.update({ lecturer_id: createdLecturer.dataValues.id });
  }
  return createdLecturer.dataValues;
};

// PUT
module.exports.updateLecturer = async (
  transaction,
  { lecturerId, academic_title, firstname, lastname, email, salutation, phonenumber, experience, rating, is_extern, profile, cv, research }
) => {
  const lecturer = await this.findLecturerById(lecturerId);
  const lecturerToUpdate = {
    lecturerId,
    academic_title,
    firstname,
    lastname,
    email,
    salutation,
    phonenumber,
    experience,
    rating,
    is_extern,
    profile,
    cv,
    research,
  };
  await lecturer.update({ ...lecturerToUpdate }, transaction);
  return lecturer.dataValues;
};

// Delete
module.exports.deleteLecturer = async (transaction, lecturerId) => {
  const counter = await db.Lecturer.destroy({ where: { id: lecturerId } }, transaction);
  return counter > 0;
};
