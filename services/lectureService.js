const db = require('../database/database');

/*
 * Receives lectureId
 *
 * Returns founded lecture
 */
module.exports.findLectureById = async (lectureId) => {
  const lectureToFind = await db.Lecture.findOne({
    where: { id: lectureId },
  });
  return lectureToFind;
};

/*
 * Receives lecture name
 *
 * Returns founded lecture
 */
module.exports.findLectureByName = async (lectureName) => {
  const lectureToFind = await db.Lecture.findOne({
    where: { name: lectureName },
  });
  return lectureToFind;
};

/*
 * Returns founded lectures []
 */
module.exports.getAllLectures = async () => {
  const lectures = await db.Lecture.findAll();
  return lectures;
};

/*
 * Receives lecture, { withMainFocus, withModule }
 */
module.exports.createLecture = async (lecture, { withMainFocus, withModule }) => {
  const withInclude = [];
  if (withMainFocus) withInclude.push({ model: db.MainFocus });
  if (withModule) withInclude.push({ model: db.Module });

  let transaction;
  try {
    transaction = await db.sequelize.transaction(); // Managed Transaction
    const Lecture = await db.Lecture.create({ ...lecture }, { include: withInclude }, transaction);

    await transaction.commit();

    return Lecture.dataValues;
  } catch (error) {
    console.log('createLecture', error);
    transaction.rollback();
  }
};
