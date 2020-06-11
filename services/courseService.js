const db = require('../database/database');
const majorSubjectService = require('./majorSubjectService');

/*
 * Returns founded course
 */
module.exports.findCourseById = async (course_id) => {
  const course = await db.Course.findOne({ where: { course_id } });
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
// name of course, majorSubjectId, directorOfStudiesId
module.exports.createCourse = async (
  transaction,
  { name, majorSubject_id, directorOfStudies_id },
  withMajorSubject,
  withDirectorOfStudies
) => {
  const withInclude = [];
  if (withDirectorOfStudies) withInclude.push({ model: db.DirectorOfStudies });
  if (withMajorSubject) {
    const majorSubject = await majorSubjectService.findMajorSubjectById(majorSubject_id);
    if (!majorSubject) return { error: 'No such major subject found!' };
  }
  const course = await db.Course.create({ name, majorSubject_id, directorOfStudies_id }, { transaction });

  return course.dataValues;
};

// PUT
// wie post s.o.
// receives (course) -> id, name, majorSubjectId, DoSID
module.exports.updateCourse = async (transaction, { course_id, name }) => {
  const course = await this.findCourseById(course_id);
  await course.update({ name }, transaction);
  return course.dataValues;
};

// Delete
// receives (courseId, dosId)
module.exports.deleteCourse = async (transaction, course_id) => {
  const counter = await db.Course.destroy({ where: { course_id }, transaction });
  return counter > 0;
};
