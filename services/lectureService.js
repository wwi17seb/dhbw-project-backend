const db = require('../database/database');

async function findLectureById(lecture_id) {
  const lecture = await db.Lecture.findOne({ where: { lecture_id } });

  return lecture ? lecture.dataValues : null;
}

// POST
module.exports.createLecture = async (
  transaction,
  { name, workload_home, workload_dhbw, catalog_id, module_id, mainFocus_ids }
) => {
  const lectureToCreate = { name, workload_home, workload_dhbw, catalog_id, module_id };

  const Lecture = await db.Lecture.create(lectureToCreate, { transaction });
  await Lecture.setMainFocuses(mainFocus_ids, { transaction });

  return Lecture.dataValues;
};

// PUT
module.exports.updateLecture = async (
  transaction,
  { lecture_id, name, workload_home, workload_dhbw, module_id, mainFocus_ids }
) => {
  const lecture = await db.Lecture.findOne({ where: { lecture_id } });
  await lecture.update({ name, workload_home, workload_dhbw, module_id }, transaction);
  await lecture.setMainFocuses(mainFocus_ids, { transaction });

  return lecture.dataValues;
};

// DELETE
module.exports.deleteLecture = async (transaction, lecture_id) => {
  const counter = await db.Lecture.destroy({ where: { lecture_id } }, transaction);

  return counter > 0;
};
