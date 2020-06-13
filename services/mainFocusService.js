const db = require('../database/database');

/*
 * Returns founded course
 */

module.exports.findMainFoucsById = async (course_id) => {
  const mainFocus = await db.MainFocus.findOne({ where: { course_id } });
  return mainFocus ? mainFocus.dataValues : null;
};

/*
 * Returns founded mainfocus
 */
module.exports.findMainFocusByName = async (name) => {
  const mainfocus = await db.MainFocus.findOne({ where: { name } });
  return mainfocus.dataValues;
};

// GET
/*
 * Returns founded mainfocus
 */
module.exports.findAll = async () => {
  const mainfocusses = await db.MainFocus.findAll();
  return mainfocusses;
};

// POST
module.exports.createMainFocus = async (transaction, { name }) => {
  const mainFocus = await db.MainFocus.create({ name }, { transaction });
  return mainFocus.dataValues;
};

// PUT
module.exports.updateMainFocus = async (transaction, { mainFocus_id, name }) => {
  const updatedRows = await db.MainFocus.update({ name }, { where: { mainFocus_id }, transaction });
  return updatedRows > 0;
};

// Delete
module.exports.deleteMainFocus = async (transaction, mainFocus_id) => {
  const deletedRows = await db.MainFocus.destroy({ where: { mainFocus_id }, transaction });
  return deletedRows > 0;
};
