const db = require('../database/database');

/*
 * Returns founded FieldOfStudie
 */
module.exports.findFieldOfStudieById = async (fieldOfStudieId) => {
  const fieldOfStudie = await db.FieldOfStudie.findOne({ where: { id: fieldOfStudieId } });
  return fieldOfStudie;
};

/*
 * Returns founded FieldOfStudie
 */
module.exports.findFieldOfStudieByName = async (FieldOfStudieName) => {
  const fieldOfStudie = await db.FieldOfStudie.findOne({ where: { name: FieldOfStudieName } });
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
module.exports.updateFieldOfStudie = async (transaction, { fieldOfStudieId, name }) => {
  const fieldOfStudie = await this.findFieldOfStudieById(fieldOfStudieId);
  fieldOfStudie.update({ name }, transaction);
  return fieldOfStudie.dataValues;
};

// Delete
// receives (fieldOfStudieId)
/*
 * Returns boolean
 */
module.exports.deleteFieldOfStudie = async (transaction, fieldOfStudieId) => {
  const counter = await db.FieldOfStudie.destroy({ where: { id: fieldOfStudieId } }, transaction);
  return counter > 0;
};
