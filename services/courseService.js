const db = require('../database/database');
const majorSubjectService = require('./majorSubjectService');

/*
 * Returns founded course
 */

module.exports.findCourseById = async (course_id) => {
  const withInclude = [{ model: db.DirectorOfStudies, attributes: ['directorOfStudies_id', 'username', 'is_admin'] }];
  const course = await db.Course.findOne({ where: { course_id }, include: withInclude });
  return course ? course.dataValues : null;
};

/*
 * Returns founded course
 */
module.exports.findCourseByName = async (name) => {
  const withInclude = [{ model: db.DirectorOfStudies, attributes: ['directorOfStudies_id', 'username', 'is_admin'] }];
  const course = await db.Course.findOne({ where: { name }, include: withInclude });
  return course.dataValues;
};

// GET
// course dann mit withMajorSubject, withSemesters, withFieldOfStudy
/*
 * Returns founded course
 */
module.exports.findAll = async (withMajorSubject, withSemesters, withFieldOfStudy) => {
  const withInclude = [{ model: db.DirectorOfStudies, attributes: ['directorOfStudies_id', 'username', 'is_admin'] }];
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
  { name, majorSubject_id, google_calendar_id, directorOfStudies_ids, Semesters }
) => {
  const course = await db.Course.create(
    { name, majorSubject_id, google_calendar_id, Semesters },
    { transaction, include: [{ association: db.Course.Semester }] }
  );

  await course.addDirectorsOfStudies(directorOfStudies_ids, { transaction });

  return course.dataValues;
};

// PUT
// receives (course) -> course_id, name, majorSubject_id, google_calendar_id
module.exports.updateCourse = async (
  transaction,
  { course_id, name, majorSubject_id, google_calendar_id, directorOfStudies_ids }
) => {
  const course = await db.Course.findOne({ where: { course_id }, transaction });

  await course.update({ name, majorSubject_id, google_calendar_id }, { transaction });

  await course.setDirectorsOfStudies(directorOfStudies_ids, {
    transaction,
  });
  return Boolean(course);
};

// Delete
// receives (course_id)
module.exports.deleteCourse = async (transaction, course_id) => {
  const counter = await db.Course.destroy({ where: { course_id }, transaction });
  return counter > 0;
};
