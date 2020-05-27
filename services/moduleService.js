const db = require('../database/database');

const lecService = require('./lecturerService');

/**
 * Receives { name, catalog_id, Lecturers }
 *
 * Return a new, persisted module
 */
module.exports.createModule = async (transaction, { name, catalog_id, Lecturers, ects, requirements }) => {
  const extractedModule = { name, catalog_id, Lecturers, ects, requirements };
  const createdModule = await db.Module.create({ ...extractedModule }, transaction);
  return createdModule.dataValues;
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
  return modules;
};

/**
 * Receives the id of module
 *
 * Returns a module
 */
module.exports.findModuleById = async (module_id) => {
  const moduleToFind = await db.Module.findOne({
    where: {  module_id },    include: [{ model: db.Lecture, as: 'lectures' }],  });
  return moduleToFind;
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
  return moduleToFind;
};

/**
 * Receives module: { name, catalog_id } and lecturerId
 *
 * Return a new, persisted module with
 */
module.exports.createModuleWithLecturers = async ({ name, catalog_id, lecturerIds }) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction(); // Managed Transaction

    const createdModule = await db.Module.create(
      {
        name,
        catalog_id,
      },
      transaction
    );

    // add lectureres to association 
    lecturerIds.forEach(lecturer_id => {
      const lecturer = await lecService.findLecturerById(lecturer_id);
      await createdModule.addLecturer(lecturer, {
        through: { model: db.Lecturer_Module },
      });
    });
    
    await transaction.commit();

    return createdModule.dataValues;
  } catch (error) {
    console.log('createModule', error);
    transaction.rollback();
  }
};

// PUT
// wie post s.o.
// receives (Module) -> moduleId, name, requirements, ects
module.exports.updateModule = async (transaction, { module_id, name, requirements, ects }) => {
  const module = await this.findMajorSubjectById(module_id);
  await module.update({ name, requirements, ects }, transaction);

  return module.dataValues;
};

/**
 * Receives the id of the module
 *
 * Returns number of deleted entries e.g. 1
 * @type {number}
 */
module.exports.delete = async (module_id) => {
  const counter = await db.Module.destroy({
    where: { module_id },
    include: [{ model: db.Lecture, as: 'lectures' }],
  });
  return counter > 0;
};