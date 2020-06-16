const db = require('../database/database');

// GET
module.exports.findSemesterById = async (semester_id) => {
  const semester = await db.Semester.findOne({ where: { semester_id } });

  return semester ? semester.dataValues : null;
};

// POST
module.exports.createSemester = async (transaction, { name, number, start_date, end_date, course_id }) => {
  const semesterToCreate = { name, number, start_date, end_date, course_id };

  const Semester = await db.Semester.create({ ...semesterToCreate }, { transaction });

  return Semester.dataValues;
};

// PUT
module.exports.updateSemester = async (transaction, { semester_id, name, number, start_date, end_date }) => {
  const rowsUpdated = await db.Semester.update(
    { name, number, start_date, end_date },
    { where: { semester_id }, transaction }
  );

  return rowsUpdated > 0;
};

// DELETE
module.exports.deleteSemester = async (transaction, semester_id) => {
  const rowsDeleted = await db.Semester.destroy({ where: { semester_id }, transaction });

  return rowsDeleted > 0;
};
