const db = require('../database/database');

/*
 * Returns found FieldOfStudy
 */
module.exports.findFieldOfStudyById = async (fieldOfStudy_id, withMajorSubjects = false) => {
  let options = { where: { fieldOfStudy_id } };
  if (withMajorSubjects) {
    options.include = db.MajorSubject;
  }
  return await db.FieldOfStudy.findOne(options);
};

/*
 * Returns found FieldOfStudy
 */
module.exports.findFieldOfStudyByName = async (fieldOfStudyName) => {
  const fieldOfStudy = await db.FieldOfStudy.findOne({ where: { name: fieldOfStudyName } });
  return fieldOfStudy.dataValues;
};

// GET
/*
 * Returns found FieldsOfStudy
 */
module.exports.findAll = async (withMajorSubjects = false) => {
  let options = {};
  if (withMajorSubjects) {
    options.include = db.MajorSubject;
  }
  const fieldsOfStudy = await db.FieldOfStudy.findAll(options);

  return fieldsOfStudy;
};

// POST
/*
 * Returns created FieldOfStudy
 */
module.exports.createFieldOfStudy = async (transaction, name) => {
  const fieldOfStudy = await db.FieldOfStudy.create({ name }, { transaction });
  return fieldOfStudy.dataValues;
};

// PUT
// wie post s.o.
// receives (FieldOfStudy) -> id, name
module.exports.updateFieldOfStudy = async (transaction, { fieldOfStudy_id, name }) => {
  const updatedFiledOfStudy = await db.FieldOfStudy.update({ name }, { where: { fieldOfStudy_id }, transaction });
  return updatedFiledOfStudy > 0;
};

// Delete
// receives (fieldOfStudyId)
/*
 * Returns boolean
 */
module.exports.deleteFieldOfStudy = async (transaction, fieldOfStudy_id) => {
  const counter = await db.FieldOfStudy.destroy({ where: { fieldOfStudy_id }, transaction });
  return counter > 0;
};
