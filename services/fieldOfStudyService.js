const db = require('../database/database');

/*
 * Returns founded FieldOfStudie
 */
module.exports.findFieldOfStudieById = async (fieldOfStudie_id) => {
  const fieldOfStudie = await db.FieldOfStudie.findOne({ where: { fieldOfStudie_id } });
  return fieldOfStudie;
};

/*
 * Returns founded FieldOfStudie
 */
module.exports.findFieldOfStudieByName = async (fieldOfStudieName) => {
  const fieldOfStudie = await db.FieldOfStudie.findOne({ where: { name: fieldOfStudieName } });
  return fieldOfStudie;
};

// GET
/*
 * Returns founded FieldOfStudies
 */
module.exports.findAll = async () => {
  const fieldOfStudies = await db.FieldOfStudie.findAll();
  return fieldOfStudies;
};

// POST
/*
 * Returns created FieldOfStudie
 */
module.exports.createFieldOfStudie = async (transaction, name) => {
  const fieldOfStudie = await db.FieldOfStudie.create({ name }, transaction);
  return fieldOfStudie.dataValues;
};

// PUT
// wie post s.o.
// receives (FieldOfStudie) -> id, name
module.exports.updateFieldOfStudie = async (transaction, { fieldOfStudie_id, name }) => {
  const fieldOfStudie = await this.findFieldOfStudieById(fieldOfStudie_id);
  fieldOfStudie.update({ name }, transaction);
  return fieldOfStudie.dataValues;
};

// Delete
// receives (fieldOfStudieId)
/*
 * Returns boolean
 */
module.exports.deleteFieldOfStudie = async (transaction, fieldOfStudie_id) => {
  const counter = await db.FieldOfStudie.destroy({ where: { fieldOfStudie_id } }, transaction);
  return counter > 0;
};
