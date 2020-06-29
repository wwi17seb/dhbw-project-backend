const db = require('../database/database');
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

module.exports.findPresentationByLecturerIdWithCoLecturer = async (lecturer_id) => {
  const qry =
    'SELECT A.lecture_id, A.presentation_id, B.lecturer_id, lecturer.salutation, lecturer.academic_title, lecturer.firstname, ' +
    ' lecturer.lastname, course.name as course_name FROM presentation A, ' +
    ' presentation B INNER JOIN lecturer ON B.lecturer_id = lecturer.lecturer_id INNER JOIN course ON B.course_id = course.course_id WHERE A.lecturer_id = ' +
    lecturer_id +
    ' AND A.lecturer_id <> B.lecturer_id AND A.lecture_id = B.lecture_id';

  var [multipleLecturers, metadata] = await db.sequelize.query(qry);
  let where = { lecturer_id };
  var Presentations = await db.Presentation.findAll({ include: withInclude, where });
  Presentations = Presentations.map((Presentations) => Presentations.dataValues);
  for (var i = 0; i != Presentations.length; i++) {
    for (var j = 0; j != multipleLecturers.length; j++) {
      Presentations[i]['coLecturers'] = [];
      if (Presentations[i].presentation_id === multipleLecturers[j].presentation_id) {
        multipleLecturers[j]['lecture_name'] = Presentations[i].Lecture.name;
        multipleLecturers[j]['start_date'] = Presentations[i].Semester.start_date;
        multipleLecturers[j]['end_date'] = Presentations[i].Semester.end_date;
        Presentations[i]['coLecturers'].push(multipleLecturers[j]);
      }
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
  if (status){
    where = {...where, status};
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
