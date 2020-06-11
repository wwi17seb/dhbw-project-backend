const db = require('../database/database');

/*
 * Receives semesterId
 *
 * Returns founded semester
 */
module.exports.findSemesterById = async (semester_id) => {
  const semesterToFind = await db.Semester.findOne({ where: { semester_id } });
  return semesterToFind.dataValues;
};

/*
 * Receives semester name
 *
 * Returns founded semester
 */
module.exports.findLectureByName = async (semesterName) => {
  const semesterToFind = await db.Semester.findOne({ where: { name: semesterName } });
  return semesterToFind.dataValues;
};

/*
 * Returns all semesters []
 */
module.exports.getAllSemesters = async () => {
  const semesters = await db.Semester.findAll();

  return semesters;
};

// POST
/*
 * Receives transaction, semester: { semester_id, name, number, start_date, end_date }
 * creates a semester
 */
module.exports.createSemester = async (transaction, { name, number, start_date, end_date }) => {
  const semesterToCreate = { name, number, start_date, end_date };

  const Semester = await db.Semester.create({ ...semesterToCreate }, { transaction });

  return Semester.dataValues;
};

// PUT
/*
 * Receives transaction, semester: { semester_id, name, number, start_date, end_date }
 * updates a semester
 */
module.exports.updateSemester = async (transaction, { semester_id, name, number, start_date, end_date }) => {
  const semester = await this.findSemesterById(semester_id);
  await semester.update({ name, number, start_date, end_date }, { transaction });
  return semester.dataValues;
};

// Delete
/*
 * Receives transaction and semester_id
 * deletes a semester
 */
module.exports.deleteSemester = async (transaction, semester_id) => {
  const counter = await db.Semester.destroy({ where: { semester_id }, transaction });
  return counter > 0;
};
