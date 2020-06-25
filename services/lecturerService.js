const db = require('../database/database');

// GET
module.exports.findLecturerById = async (lecturer_id) => {
  const lecturer = await db.Lecturer.findOne({
    where: { lecturer_id },
  });

  return lecturer ? lecturer.dataValues : null;
};

module.exports.findAllLecturers = async () => {
  const lecturers = await db.Lecturer.findAll({
    include: [
      { model: db.DirectorOfStudies, attributes: ['directorOfStudies_id', 'username', 'is_admin'] },
      { model: db.MainFocus },
    ],
  });

  return lecturers;
};

// POST
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
    mainFocus_ids,
    possibleLectures
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
    possibleLectures
  };

  const createdLecturer = await db.Lecturer.create(lecturerToCreate, { transaction });

  await createdLecturer.addMainFocuses(mainFocus_ids, { transaction });

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
    mainFocus_ids,
    possibleLectures
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
    possibleLectures
  };
  const lecturer = await db.Lecturer.findOne({ where: { lecturer_id }, transaction });
  await lecturer.update({ ...lecturerToUpdate }, { transaction });

  await lecturer.setMainFocuses(mainFocus_ids, { transaction });

  return Boolean(lecturer);
};

// DELETE
module.exports.deleteLecturer = async (transaction, lecturer_id) => {
  const counter = await db.Lecturer.destroy({ where: { lecturer_id }, transaction });

  return counter > 0;
};
