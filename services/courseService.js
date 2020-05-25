const db = require('../database/database');

/*
 * Returns founded course
 */
module.exports.findCourseById = async (courseId) => {
  const course = await db.Course.findOne({ where: { id: courseId } });
  return course;
};

/*
 * Returns founded course
 */
module.exports.findCourseByName = async (courseName) => {
  const course = await db.Course.findOne({ where: { name: courseName } });
  return course;
};

// GET
// course dann mit withMajorSubject, withSemesters, withFieldOfStudy
/*
 * Returns founded course
 */
module.exports.findAll = async (withMajorSubject, withSemesters, withFieldOfStudy) => {
  const withInclude = [];
  if (withMajorSubject) withInclude.push({ model: db.MajorSubject });
  if (withSemesters) withInclude.push({ model: db.Semester });
  if (withFieldOfStudy) withInclude.push({ model: db.FieldOfStudy });
  const courses = await db.Course.findAll({ include: withInclude });
  return courses;
};

// POST
// name of course
// + major subject id, DosId
// TODO: majorSubjectId find by id 
module.exports.createCourse = async (transaction, { name, majorSubjectId, directorOfStudiesId }, withMajorSubject, withDirectorOfStudies) => {
  const withInclude = [];
  if (withDirectorOfStudies) withInclude.push({ model: db.DirectorOfStudies });
  if (withMajorSubject) withInclude.push({ model: db.MajorSubject });
  // TODO: check if majorSubjectId is in Database

  const course = await db.Course.create({ name, createdBy_id: directorOfStudiesId }, { include: withInclude }, transaction);

  return course.dataValues;
};

// PUT
// wie post s.o.
// receives (course) -> id, name, majorSubjectId, DoSID
module.exports.updateCourse = async (transaction, { name, majorSubjectId, directorOfStudiesId }, withMajorSubject, withDirectorOfStudies) => {
  const withInclude = [];
  if (withDirectorOfStudies) withInclude.push({ model: db.DirectorOfStudies });
  if (withMajorSubject) withInclude.push({ model: db.MajorSubject });

  const course = await db.Course.update({ name, createdBy_id: directorOfStudiesId }, { include: withInclude }, transaction);

  return course.dataValues;
};

// Delete
// receives (courseId, dosId)
module.exports.deleteCourse = async (transaction, courseId) => {
  const counter = await db.Course.destroy({ where: { id: courseId } }, transaction);
  return counter > 0;
};
