const db = require('../database/database');
const directorOfStudiesService = require('./directorOfStudiesService');

/*
 * Returns founded lecturer
 */
module.exports.findLecturerById = async (lecturer_id) => {
  const lecturer = await db.Lecturer.findOne({ where: { lecturer_id }, transaction });
  return lecturer;
};

/*
 * Returns founded lecturer
 */
module.exports.findLecturerByName = async ({ lastname, firstname }, withFirstname, withLastname) => {
  const searchParams = {};
  if (withFirstname) searchParams.firstname = firstname;
  if (withLastname) searchParams.lastname = lastname;
  const lecturer = await db.Lecturer.findOne({ where: searchParams, transaction });
  return lecturer;
};

/*
 * Returns founded lecturers []
 */
module.exports.findAllLecturer = async () => {
  const lecturers = await db.Lecturer.findAll();
  return lecturers.dataValues;
};

/*
 * directorOfStudiesId represents the director of studies adding the new lecturer
 *
 * Returns created lecturer
 */
module.exports.createLecturer = async (
  transaction,
  { academic_title, firstname, lastname, email, salutation, phonenumber, experience, is_extern, profile, cv, research },
  directorOfStudies_id
) => {
  const lecturerToCreate = {
    academic_title,
    firstname,
    lastname,
    email,
    salutation,
    phonenumber,
    experience,
    is_extern,
    profile,
    cv,
    research,
    createdBy_id: directorOfStudies_id,
  };

  const buildedLecturer = await db.Lecturer.build(lecturerToCreate);
  await buildedLecturer.save();
  const createdLecturer = await db.Lecturer.create({ ...lecturerToCreate }, { transaction });

  const directorOfStudies = await directorOfStudiesService.findDirectorOfStudiesById(directorOfStudies_id);
  await directorOfStudies.update({ lecturer_id: createdLecturer.dataValues.lecturer_id });

  return buildedLecturer.dataValues;
};

// PUT
module.exports.updateLecturer = async (
  transaction,
  {
    lecturer_id,
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
  }
) => {
  const lecturerToUpdate = {
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
  const updatedLecturere = await db.Lecturer.update({ ...lecturerToUpdate }, { where: { lecturer_id }, transaction });
  return updatedLecturere > 0;
};

// Delete
module.exports.deleteLecturer = async (transaction, lecturer_id) => {
  const counter = await db.Lecturer.destroy({ where: { lecturer_id }, transaction });
  return counter > 0;
};
