const db = require('../database/database');

/*
 * Returns found FieldOfStudy
 */
module.exports.findFieldOfStudyById = async (fieldOfStudy_id) => {
  const fieldOfStudy = await db.FieldOfStudy.findOne({ where: { fieldOfStudy_id } });
  return fieldOfStudy;
};

/*
 * Returns found FieldOfStudy
 */
module.exports.findFieldOfStudyByName = async (fieldOfStudyName) => {
  const fieldOfStudy = await db.FieldOfStudy.findOne({ where: { name: fieldOfStudyName } });
  return fieldOfStudy;
};

// GET
/*
 * Returns found FieldOfStudies
 */
module.exports.findAll = async () => {
  const fieldOfStudies = await db.FieldOfStudy.findAll();
  return fieldOfStudies;
};

// POST
/*
 * Returns created FieldOfStudy
 */
module.exports.createFieldOfStudy = async (transaction, name) => {
  const fieldOfStudy = await db.FieldOfStudy.create({ name }, transaction);
  return fieldOfStudy.dataValues;
};

// PUT
// wie post s.o.
// receives (FieldOfStudy) -> id, name
module.exports.updateFieldOfStudy = async (transaction, { fieldOfStudy_id, name }) => {
  const fieldOfStudy = await this.findFieldOfStudyById(fieldOfStudy_id);
  fieldOfStudy.update({ name }, transaction);
  return fieldOfStudy.dataValues;
};

// Delete
// receives (fieldOfStudyId)
/*
 * Returns boolean
 */
module.exports.deleteFieldOfStudy = async (transaction, fieldOfStudy_id) => {
  const counter = await db.FieldOfStudy.destroy({ where: { fieldOfStudy_id } }, transaction);
  return counter > 0;
};
