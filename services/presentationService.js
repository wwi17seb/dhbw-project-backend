const db = require('../database/database');
const copyObjectHelper = require('../helpers/propertyCopyHelper');

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
  { model: db.Course, attributes: ['name'] },
];
// GET
module.exports.findPresentationById = async (presentation_id) => {
  const presentation = await db.Presentation.findOne({ where: { presentation_id } });

  return presentation ? presentation.dataValues : null;
};

module.exports.findPresentationsByLecturerIdWithCoLecturer = async (lecturer_id) => {
  let where = { lecturer_id };
  let Presentations = await db.Presentation.findAll({ include: withInclude, where });

  const coLecturersConnection = await db.sequelize.query(
    `SELECT A.presentation_id, B.status, B.lecturer_id, L.firstname, L.lastname, L.academic_title, L.salutation, L.is_extern
    FROM presentation A, presentation B INNER JOIN lecturer L ON B.lecturer_id = L.lecturer_id
    WHERE A.course_id = B.course_id
      AND A.lecture_id = B.lecture_id
      AND A.lecturer_id = :lecturerId
      AND B.lecturer_id != :lecturerId;`,
    {
      replacements: { lecturerId: lecturer_id },
      type: db.Sequelize.QueryTypes.SELECT,
    }
  );

  const presentationCoLecturersMap = coLecturersConnection.reduce(function (map, obj) {
    if (map[obj.presentation_id] === undefined) {
      map[obj.presentation_id] = [];
    }
    map[obj.presentation_id].push(
      copyObjectHelper(obj, [
        'status',
        'lecturer_id',
        'firstname',
        'lastname',
        'academic_title',
        'salutation',
        'is_extern',
      ])
    );
    return map;
  }, {});

  Presentations = Presentations.map((Presentation) => {
    const p = Presentation.dataValues;
    p.CoLecturers = presentationCoLecturersMap[p.presentation_id] || [];
    return p;
  });

  return Presentations;
};

module.exports.findPresentationsByLecturerId = async (lecturer_id) => {
  let where = { lecturer_id };

  const presentations = await db.Presentation.findAll({ include: withInclude, where });
  return presentations.map((presentations) => presentations.dataValues);
};

module.exports.findAll = async (course_id, semester_id) => {
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
