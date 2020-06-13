const db = require('../database/database');

// GET
module.exports.findLecturerById = async (lecturer_id) => {
  const lecturer = await db.Lecturer.findOne({
    where: { lecturer_id },
  });

  return lecturer ? lecturer.dataValues : null;
};

module.exports.findAllLecturer = async () => {
  const lecturers = await db.Lecturer.findAll({
    include: [{ model: db.DirectorOfStudies, attributes: ['directorOfStudies_id', 'username', 'is_admin'] }],
  });

  return lecturers;
};

// POST
// TODO: Add MainFocuses
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
) => {
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

  const createdLecturer = await db.Lecturer.create(lecturerToCreate, { transaction });

  return createdLecturer.dataValues;
};

// PUT
// TODO: Add MainFocuses
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
  lecturer_id
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
  const updatedLecturer = await db.Lecturer.update({ ...lecturerToUpdate }, { where: { lecturer_id }, transaction });

  return updatedLecturer > 0;
};

// DELETE
module.exports.deleteLecturer = async (transaction, lecturer_id) => {
  const counter = await db.Lecturer.destroy({ where: { lecturer_id }, transaction });

  return counter > 0;
};
