const db = require('../database/database');
const lecturerService = require('./lecturerService');
const { Op } = require('sequelize');

const withInclude = [
  { model: db.Semester },
  { model: db.AcademicRecord },
  {
    model: db.Lecture,
    include: [
      { model: db.MainFocus, through: { attributes: [] } },
      {
        model: db.Module,
        include: [{ model: db.ModuleGroup }, { model: db.AcademicRecord, through: { attributes: [] } }],
      },
    ],
  },
  { model: db.Lecturer, include: [{ model: db.MainFocus, through: { attributes: [] } }] },
  { model: db.DirectorOfStudies, attributes: ['directorOfStudies_id', 'username'] },
];
// GET
module.exports.findPresentationById = async (presentation_id) => {
  const presentation = await db.Presentation.findOne({ where: { presentation_id } });

  return presentation ? presentation.dataValues : null;
};

// FIXME:
module.exports.findPresentationByLecturerIdWithCoLecturer = async (lecturer_id) => {
  let where = { lecturer_id };
  let Presentations = await db.Presentation.findAll({ include: withInclude, where });
  Presentations = Presentations.map((Presentations) => Presentations.dataValues);

  // find all presentations with same course, semester and lecture id
  // find lecturer to presentation

  for (let i = 0; i < Presentations.length; i++) {
    // get all presentations with same information
    let coPresentations = await db.Presentation.findAll({
      where: {
        course_id: Presentations[i].course_id,
        semester_id: Presentations[i].semester_id,
        lecture_id: Presentations[i].lecture_id,
        lecturer_id: { [Op.not]: Presentations[i].lecturer_id },
      },
    });
    coPresentations = coPresentations.map((coPresentations) => coPresentations.dataValues);

    // create coLecturers array
    Presentations[i]['coLecturers'] = [];

    // get each lecturer for coLecturers array
    for (let j = 0; j < coPresentations.length; j++) {
      let coLecturer = await lecturerService.findLecturerById(coPresentations[j].lecturer_id);
      Presentations[i]['coLecturers'].push(coLecturer);
    }
  }
  return Presentations;
};

module.exports.findPresentationByLecturerId = async (lecturer_id, status) => {
  let where = { lecturer_id };
  if (status) {
    where = { ...where, status };
  }

  const presentations = await db.Presentation.findAll({ include: withInclude, where });
  return presentations.map((presentations) => presentations.dataValues);
};

module.exports.findAll = async (course_id, semester_id, status) => {
  let where = { course_id };
  if (semester_id) {
    where = { ...where, semester_id };
  }
  if (status) {
    where = { ...where, status };
  }
  const presentations = await db.Presentation.findAll({ include: withInclude, where });
  return presentations.map((presentation) => presentation.dataValues);
};

// POST
module.exports.createPresentation = async (
  transaction,
  { directorOfStudies_id, course_id, semester_id, academicRecord_id, lecture_id, lecturer_id, status }
) => {
  const presentation = await db.Presentation.create(
    {
      course_id,
      semester_id,
      academicRecord_id,
      lecture_id,
      lecturer_id,
      status,
      createdBy_id: directorOfStudies_id,
    },
    { transaction }
  );

  return presentation.dataValues;
};

// PUT
module.exports.updatePresentation = async (
  transaction,
  { presentation_id, directorOfStudies_id, course_id, semester_id, academicRecord_id, lecture_id, lecturer_id, status }
) => {
  const updatedRows = await db.Presentation.update(
    {
      createdBy_id: directorOfStudies_id,
      course_id,
      semester_id,
      academicRecord_id,
      lecture_id,
      lecturer_id,
      status,
    },
    { where: { presentation_id }, transaction }
  );

  return updatedRows > 0;
};

// DELETE
module.exports.deletePresentation = async (transaction, presentation_id) => {
  const counter = await db.Presentation.destroy({ where: { presentation_id }, transaction });

  return counter > 0;
};
