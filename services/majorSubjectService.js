const db = require('../database/database');

// GET
module.exports.findMajorSubjectById = async (majorSubject_id) => {
  const majorSubject = await db.MajorSubject.findOne({ where: { majorSubject_id } });

  return majorSubject ? majorSubject.dataValues : null;
};

module.exports.findAll = async () => {
  const majorSubjects = await db.MajorSubject.findAll({ plain: true, raw: true, include: [db.FieldOfStudy] });

  return majorSubjects;
};

// POST
module.exports.createMajorSubject = async (transaction, name, fieldOfStudy_id) => {
  const majorSubject = await db.MajorSubject.create({ name, fieldOfStudy_id }, { transaction });

  return majorSubject.dataValues;
};

// PUT
module.exports.updateMajorSubject = async (transaction, { majorSubject_id, name, fieldOfStudy_id }) => {
  const majorSubject = await db.MajorSubject.update(
    { name, fieldOfStudy_id },
    { where: { majorSubject_id }, transaction }
  );

  return majorSubject > 0;
};

// DELETE
module.exports.deleteMajorSubject = async (transaction, majorSubject_id) => {
  const counter = await db.MajorSubject.destroy({ where: { majorSubject_id }, transaction });

  return counter > 0;
};
