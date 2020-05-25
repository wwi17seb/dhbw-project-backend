const db = require('../database/database');

/*
 * Returns founded MajorSubject
 */
module.exports.findMajorSubjectById = async (majorSubjectId) => {
  const majorSubject = await db.MajorSubject.findOne({ where: { id: majorSubjectId } });
  return majorSubject;
};

/*
 * Returns founded MajorSubject
 */
module.exports.findMajorSubjectByName = async (majorSubjectName) => {
  const majorSubject = await db.MajorSubject.findOne({ where: { name: majorSubjectName } });
  return majorSubject;
};

// GET
/*
 * Returns founded MajorSubjects
 */
module.exports.findAll = async () => {
  const majorSubjects = await db.MajorSubject.findAll();
  return majorSubjects;
};

// POST
/*
 * Returns created MajorSubject
 */
module.exports.createMajorSubject = async (transaction, name, fieldOfStudyId) => {
  const majorSubject = await db.MajorSubject.create({ name, fieldOfStudy_id: fieldOfStudyId }, transaction);
  return majorSubject.dataValues;
};

// PUT
// wie post s.o.
// receives (MajorSubject) -> id, name
module.exports.updateMajorSubject = async (transaction, { majorSubjectId, name }) => {
  const majorSubject = await this.findMajorSubjectById(majorSubjectId);
  majorSubject.update({ name }, transaction);

  return majorSubject.dataValues;
};

// Delete
// receives (majorSubjectId)
/*
 * Returns boolean
 */
module.exports.deleteMajorSubject = async (transaction, majorSubjectId) => {
  const counter = await db.MajorSubject.destroy({ where: { id: majorSubjectId } }, transaction);
  return counter > 0;
};
