const db = require('../database/database');

// GET
module.exports.findPresentationById = async (presentation_id) => {
  const presentation = await db.Presentation.findOne({ where: { presentation_id } });

  return presentation ? presentation.dataValues : null;
};

module.exports.findPresentationByLecturerId = async (lecturer_id) => {
  let where = { lecturer_id };

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

  const presentations = await db.Presentation.findAll({ include: withInclude, where });
  return presentations.map((presentations) => presentations.dataValues);
};

module.exports.findAll = async (course_id, semester_id) => {
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
  let where = { course_id };
  if (semester_id) {
    where = { ...where, semester_id };
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
