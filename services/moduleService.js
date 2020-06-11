const db = require('../database/database');
const acService = require('./academicRecordsService');

/**
 * Receives the id of module
 *
 * Returns a module
 */
module.exports.findModuleById = async (module_id) => {
  const moduleToFind = await db.Module.findOne({
    where: { module_id },
    include: [{ model: db.Lecture, as: 'lectures' }],
  });

  return moduleToFind.dataValues;
};

/**
 * Receives the name of module
 *
 * Returns a module
 */
module.exports.findModuleByName = async (nameOfModule) => {
  const moduleToFind = await db.Module.findOne({
    where: { name: nameOfModule },
    include: [{ model: db.Lecture, as: 'lectures' }],
  });

  return moduleToFind.dataValues;
};

/*
 * Receives object with { withLecture, withAcademicRecord, withModuleGroup }
 *
 * Returns all modules in the database
 * as an array
 */
module.exports.getAllModules = async ({ withLecture, withAcademicRecord, withModuleGroup }) => {
  const whatToInclude = [];
  if (withLecture) whatToInclude.push({ model: db.Lecture, as: 'lectures' });
  if (withAcademicRecord) whatToInclude.push({ model: db.AcademicRecord, as: 'academicRecords' });
  if (withModuleGroup) whatToInclude.push({ model: db.ModuleGroup, as: 'moduleGroup' });

  const modules = await db.Module.findAll({ include: whatToInclude });

  return modules.dataValues;
};

/**
 * Receives { moduleGroup_id, name, description, ects, catalog_id, academicRecord_ids, number_of_lectures_to_attend }
 *
 *
 * Return a new, persisted module
 */
module.exports.createModule = async (
  transaction,
  {
    moduleGroup_id,
    name,
    description,
    ects,
    catalog_id,
    number_of_lectures_to_attend,
    requirements,
    academicRecord_ids,
  }
) => {
  const extractedModule = {
    moduleGroup_id,
    name,
    description,
    ects,
    catalog_id,
    number_of_lectures_to_attend,
    requirements,
    academicRecord_ids,
  };
  // first parameter value, second parameter is option: { transaction, where: {} ...}
  const createdModule = await db.Module.create(extractedModule, { transaction });

  createdModule.addAcademicRecords(academicRecord_ids);

  return createdModule.dataValues;
};

// PUT
// wie post s.o.
// receives (Module) -> moduleId, name, requirements, ects
module.exports.updateModule = async (transaction, { module_id, name, requirements, ects }) => {
  const moduleToUpdate = await db.Module.update(
    { module_id, name, requirements, ects },
    { where: { module_id }, transaction }
  );
  // await module.update({ name, requirements, ects }, { transaction });

  return moduleToUpdate > 0;
};

// Delete
/*
 * Receives the id of the module
 *
 * returns boolean of succeeding
 * @type {boolean}
 */
module.exports.delete = async (module_id) => {
  const counter = await db.Module.destroy({
    where: { module_id },
    include: [{ model: db.Lecture, as: 'lectures' }],
  });
  return counter > 0;
};
