const db = require('../database/database');

/*
 * Receives lectureId
 *
 * Returns founded lecture
 */
module.exports.findLectureById = async (lecture_id) => {
  const lectureToFind = await db.Lecture.findOne({ where: { lecture_id } });
  return lectureToFind.dataValues;
};

/*
 * Receives lecture name
 *
 * Returns founded lecture
 */
module.exports.findLectureByName = async (lectureName) => {
  const lectureToFind = await db.Lecture.findOne({ where: { name: lectureName } });
  return lectureToFind.dataValues;
};

/*
 * Returns founded lectures []
 */
// TODO: maybe with presentations?
module.exports.getAllLectures = async (withPresentations) => {
  const withInclude = [];
  if (withPresentations) withInclude.push({ model: db.Presentation });
  const lectures = await db.Lecture.findAll({ include: withInclude });
  return lectures.dataValues;
};

/*
 * Receives lecture, { withMainFocus, withModule }
 */
module.exports.createLecture = async (
  transaction,
  { name, workload_home, workload_dhbw, catalog_id },
  { withMainFocus, withModule }
) => {
  const withInclude = [];
  if (withMainFocus) withInclude.push({ model: db.MainFocus });
  if (withModule) withInclude.push({ model: db.Module });

  const lectureToCreate = { name, workload_home, workload_dhbw, catalog_id };

  const createdLecturer = await db.Lecture.create({ ...lectureToCreate }, { include: withInclude, transaction });

  return createdLecturer.dataValues;
};

// PUT
// wie post s.o.
// receives (lecture) -> lectureId, name, workload_home, workload_dhbw, catalog_id
module.exports.updateLecture = async (transaction, { lecture_id, name, workload_home, workload_dhbw }) => {
  const updatedLecturer = await db.Lecturer.update(
    { name, workload_home, workload_dhbw },
    { where: { lecture_id }, transaction }
  );
  return updatedLecturer > 0;
};

// Delete
// receives (lectureId)
module.exports.deleteLecture = async (transaction, lecture_id) => {
  const counter = await db.Lecture.destroy({ where: { lecture_id }, transaction });
  return counter > 0;
};
