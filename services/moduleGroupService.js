const db = require('../database/database');

/*
 * Receives moduleGroup_id
 *
 * Returns founded moduleGroup
 */
module.exports.findModuleGroupById = async (moduleGroup_id) => {
  const moduleGroupToFind = await db.ModuleGroup.findOne({ where: { moduleGroup_id } });
  return moduleGroupToFind;
};

/*
 * Receives moduleGroup name
 *
 * Returns founded moduleGroup
 */
module.exports.findModuleGroupByName = async (moduleGroupName) => {
  const moduleGroupToFind = await db.ModuleGroup.findOne({ where: { name: moduleGroupName } });
  return moduleGroupToFind;
};

/*
 * Returns all moduleGroups []
 */
module.exports.getAllModuleGroup = async () => {
  const moduleGroup = await db.ModuleGroup.findAll();
  return moduleGroup;
};

// POST
/*
 * Receives moduleGroup: { name, number_of_modules_to_attend, from_semester_number, to_semester_number }
 * creates a new moduleGroup
 */
module.exports.createModuleGroup = async (
  transaction,
  { majorSubject_id, name, number_of_modules_to_attend, from_semester_number, to_semester_number }
) => {
  const moduleGroupToCreate = {
    majorSubject_id,
    name,
    number_of_modules_to_attend,
    from_semester_number,
    to_semester_number,
  };

  const moduleGroup = await db.ModuleGroup.create({ ...moduleGroupToCreate }, transaction);

  return moduleGroup.dataValues;
};

// PUT
/*
 * Receives moduleGroup: { moduleGroup_id, name, number_of_modules_to_attend, from_semester_number, to_semester_number }
 * updates a moduleGroup
 */
module.exports.updateModuleGroup = async (
  transaction,
  { moduleGroup_id, majorSubject_id, name, number_of_modules_to_attend, from_semester_number, to_semester_number }
) => {
  const moduleGroup = await this.findModuleGroupById(moduleGroup_id);
  await moduleGroup.update(
    { majorSubject_id, name, number_of_modules_to_attend, from_semester_number, to_semester_number },
    transaction
  );
  return moduleGroup.dataValues;
};

// Delete
/*
 * Receives transaction, moduleGroup_id
 * deletes a moduleGroup
 */
module.exports.deleteModuleGroup = async (transaction, moduleGroup_id) => {
  const counter = await db.ModuleGroup.destroy({ where: { moduleGroup_id } }, transaction);
  return counter > 0;
};
