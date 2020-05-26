const db = require('../database/database');

/*
 * Returns founded MajorSubject
 */
module.exports.findMajorSubjectById = async (majorSubject_id) => {
  const majorSubject = await db.MajorSubject.findOne({ where: { majorSubject_id } });
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
module.exports.createMajorSubject = async (transaction, name, fieldOfStudy_id) => {
  const majorSubject = await db.MajorSubject.create({ name, fieldOfStudy_id }, transaction);
  return majorSubject.dataValues;
};

// PUT
// wie post s.o.
// receives (MajorSubject) -> id, name
module.exports.updateMajorSubject = async (transaction, { majorSubject_id, name }) => {
  const majorSubject = await this.findMajorSubjectById(majorSubject_id);
  await majorSubject.update({ name }, transaction);

  return majorSubject.dataValues;
};

// Delete
// receives (majorSubjectId)
/*
 * Returns boolean
 */
module.exports.deleteMajorSubject = async (transaction, majorSubject_id) => {
  const counter = await db.MajorSubject.destroy({ where: { majorSubject_id } }, transaction);
  return counter > 0;
};
