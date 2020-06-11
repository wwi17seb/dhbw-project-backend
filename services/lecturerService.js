const db = require('../database/database');
const directorOfStudiesService = require('./directorOfStudiesService');

/*
 * Returns found lecturer
 */
module.exports.findLecturerById = async (lecturer_id, transaction) => {
  const lecturer = await db.Lecturer.findOne({
    where: { lecturer_id },
    transaction,
  });
  return lecturer.dataValues;
};

/*
 * Returns found lecturer
 */
module.exports.findLecturerByName = async ({ lastname, firstname }, withFirstname, withLastname) => {
  const searchParams = {};
  if (withFirstname) searchParams.firstname = firstname;
  if (withLastname) searchParams.lastname = lastname;
  const lecturer = await db.Lecturer.findOne({ where: searchParams, transaction });
  return lecturer;
};

/*
 * Returns found lecturers []
 */
module.exports.findAllLecturer = async () => {
  const lecturers = await db.Lecturer.findAll({
    include: [{ model: db.DirectorOfStudies, attributes: ['directorOfStudies_id', 'username', 'is_admin', 'misc'] }],
  });

  return lecturers;
};

/*
 * directorOfStudiesId represents the director of studies adding the new lecturer
 *
 * Returns created lecturer
 */
module.exports.createLecturer = async (
  transaction,
  {
    firstname,
    lastname,
    academic_title,
    email,
    salutation,
    phonenumber,
    experience,
    profile,
    research,
    cv,
    comment,
    is_extern,
    MainFocuses,
  },
  directorOfStudies_id
) =>
  // TODO: Add MainFocuses
  {
    const lecturerToCreate = {
      firstname,
      lastname,
      academic_title,
      email,
      salutation,
      phonenumber,
      experience,
      profile,
      research,
      cv,
      comment,
      is_extern,
      createdBy_id: directorOfStudies_id,
    };

    console.log('lecturerToCreate', lecturerToCreate);

    const createdLecturer = await db.Lecturer.create(lecturerToCreate, { transaction });

    return createdLecturer.dataValues;
  };

// PUT
module.exports.updateLecturer = async (
  transaction,
  {
    firstname,
    lastname,
    academic_title,
    email,
    salutation,
    phonenumber,
    experience,
    profile,
    research,
    cv,
    comment,
    is_extern,
    MainFocuses,
  },
  lecturer_id,
  directorOfStudies_id
) => {
  const lecturerToUpdate = {
    firstname,
    lastname,
    academic_title,
    email,
    salutation,
    phonenumber,
    experience,
    profile,
    research,
    cv,
    comment,
    is_extern,
  };
  const updatedLecturere = await db.Lecturer.update({ ...lecturerToUpdate }, { where: { lecturer_id }, transaction });
  return updatedLecturere > 0;
};

// Delete
module.exports.deleteLecturer = async (transaction, lecturer_id) => {
  const counter = await db.Lecturer.destroy({ where: { lecturer_id }, transaction });
  return counter > 0;
};
