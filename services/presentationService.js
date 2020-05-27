const db = require('../database/database');
/*
 * Returns founded presentation
 */
module.exports.findPresentationById = async (presentationId) => {
  const presentation = await db.Presentation.findOne({ where: { id: presentationId } });
  return presentation;
};

// GET
/*
 * Receives models as boolean which should be returned as well
 *
 * Returns founded presentations
 */
module.exports.findAll = async (withCourse, withSemesters, withAcademicRecord, withLecture, withLecturer) => {
  const withInclude = [];
  if (withCourse) withInclude.push({ model: db.Course });
  if (withSemesters) withInclude.push({ model: db.Semester });
  if (withAcademicRecord) withInclude.push({ model: db.AcademicRecord });
  if (withLecture) withInclude.push({ model: db.Lecture });
  if (withLecturer) withInclude.push({ model: db.Lecturer });
  const presentations = await db.Course.findAll({ include: withInclude });
  return presentations;
};

// POST
// TODO:
module.exports.createPresentation = async (transaction, { directorOfStudiesId, course_id, semester_id, academicRecord_id, lecture_id, lecturer_id }) => {
  const withInclude = [
    { model: db.DirectorOfStudies },
    { model: db.Lecturer },
    { model: db.Course },
    { model: db.Semester },
    { model: db.AcademicRecord },
    { model: db.Lecture },
  ];

  const presentation = await db.Presentation.create(
    {
      course_id,
      semester_id,
      academicRecord_id,
      lecture_id,
      lecturer_id,
      createdBy_id: directorOfStudiesId,
    },
    transaction
  );

  return presentation.dataValues;
};

// PUT
// wie post s.o.
// receives (course) -> id, name, majorSubjectId, DoSID
module.exports.updatePresentation = async (transaction, { id, name, directorOfStudiesId, courseId, semesterId, academicRecordId, lectureId, lecturerId }) => {
  const withInclude = [
    { model: db.DirectorOfStudies },
    { model: db.Lecturer },
    { model: db.Course },
    { model: db.Semester },
    { model: db.AcademicRecord },
    { model: db.Lecture },
  ];

  const presentation = await this.findPresentationById(id);

  await presentation.update(
    {
      name,
      createdBy_id: directorOfStudiesId,
      course_id: courseId,
      semester_id: semesterId,
      academicRecord_id: academicRecordId,
      lecture_id: lectureId,
      lecturer_id: lecturerId,
    },
    transaction
  );

  return presentation.dataValues;
};

// Delete
// receives (presentationId)
/*
 * Returns boolean
 */
module.exports.deletePresentation = async (transaction, presentation_id) => {
  const counter = await db.Presentation.destroy({ where: { presentation_id } }, transaction);
  return counter > 0;
};
