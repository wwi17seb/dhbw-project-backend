const db = require('../database/database');

// GET
module.exports.findFieldOfStudyById = async (fieldOfStudy_id, withMajorSubjects = false) => {
  let options = { where: { fieldOfStudy_id } };
  if (withMajorSubjects) {
    options.include = db.MajorSubject;
  }

  return await db.FieldOfStudy.findOne(options);
};

module.exports.findAll = async (withMajorSubjects = false) => {
  let options = {};
  if (withMajorSubjects) {
    options.include = db.MajorSubject;
  }
  const fieldsOfStudy = await db.FieldOfStudy.findAll(options);

  return fieldsOfStudy;
};

// POST
module.exports.createFieldOfStudy = async (transaction, name) => {
  const fieldOfStudy = await db.FieldOfStudy.create({ name }, { transaction });

  return fieldOfStudy.dataValues;
};

// PUT
module.exports.updateFieldOfStudy = async (transaction, { fieldOfStudy_id, name }) => {
  const updatedFieldOfStudy = await db.FieldOfStudy.update({ name }, { where: { fieldOfStudy_id }, transaction });

  return updatedFieldOfStudy > 0;
};

// DELETE
module.exports.deleteFieldOfStudy = async (transaction, fieldOfStudy_id) => {
  const counter = await db.FieldOfStudy.destroy({ where: { fieldOfStudy_id }, transaction });

  return counter > 0;
};
