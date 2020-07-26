const db = require('../database/database');

// GET
module.exports.findCourseById = async (transaction, course_id) => {
  const withInclude = [{ model: db.DirectorOfStudies, attributes: ['directorOfStudies_id', 'username', 'is_admin'] }];
  const course = await db.Course.findOne({ where: { course_id }, include: withInclude, transaction });

  return course ? course.dataValues : null;
};

module.exports.findAll = async () => {
  const withInclude = [
    {
      model: db.DirectorOfStudies,
      attributes: ['directorOfStudies_id', 'username', 'is_admin'],
      through: { attributes: [] },
    },
    { model: db.MajorSubject, include: [{ model: db.FieldOfStudy }] },
    { model: db.Semester },
  ];

  const courses = await db.Course.findAll({ include: withInclude });

  return courses;
};

// POST
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
module.exports.updateCourse = async (
  transaction,
  { course_id, name, majorSubject_id, google_calendar_id, directorOfStudies_ids }
) => {
  const course = await db.Course.findOne({ where: { course_id }, transaction });

  await course.update({ name, majorSubject_id, google_calendar_id }, { transaction });
  await course.setDirectorsOfStudies(directorOfStudies_ids, { transaction });

  return Boolean(course);
};

// Delete
module.exports.deleteCourse = async (transaction, course_id) => {
  const counter = await db.Course.destroy({ where: { course_id }, transaction });

  return counter > 0;
};
