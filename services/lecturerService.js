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
      { model: db.MainFocus, through: {attributes: []} },
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
    allow_manipulation,
    mainFocus_ids,
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
    allow_manipulation,
    createdBy_id: directorOfStudies_id,
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
    allow_manipulation,
    mainFocus_ids,
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
    allow_manipulation,
  };
  const lecturer = await db.Lecturer.findOne({ where: { lecturer_id }, transaction });
  await lecturer.update({ ...lecturerToUpdate }, { transaction });

  await lecturer.setMainFocuses(mainFocus_ids, { transaction });

  return Boolean(lecturer);
};

module.exports.updateLecturerCV = async (transaction, newCVName, lecturer_id) => {
  const lecturer = await db.Lecturer.findOne({ where: { lecturer_id }, transaction });
  await lecturer.update({cv: newCVName}, {transaction});

  return Boolean(lecturer);
};

// DELETE
module.exports.deleteLecturer = async (transaction, lecturer_id) => {
  const counter = await db.Lecturer.destroy({ where: { lecturer_id }, transaction });

  return counter > 0;
};
