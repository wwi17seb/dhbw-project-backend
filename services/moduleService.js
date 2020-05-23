const db = require('../database/database');

const lecService = require('./lecturerService');

/**
 * Receives { name, catalog_id, Lecturers }
 *
 * Return a new, persisted module
 */
module.exports.createModule = async ({ name, catalog_id, Lecturers }) => {
  const extractedModule = { name, catalog_id, Lecturers };
  let transaction;
  try {
    transaction = await db.sequelize.transaction(); // Managed Transaction

    const createdModule = await db.Module.create({ ...extractedModule }, transaction);

    await transaction.commit();

    return createdModule.dataValues;
  } catch (error) {
    console.log('createModule', error);
    transaction.rollback();
  }
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

  const modules = await db.Module.findAll({
    include: whatToInclude,
  });
  return modules;
};

/**
 * Receives the id of module
 *
 * Returns a module
 */
module.exports.findModuleById = async (moduleId) => {
  const moduleToFind = await db.Module.findOne({
    where: { id: moduleId },
    include: [{ model: db.Lecture, as: 'lectures' }],
  });
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
 * Receives the id of the module
 *
 * Returns number of deleted entries e.g. 1
 * @type {number}
 */
module.exports.delete = async (moduleId) => {
  const moduleToDelete = await db.Module.destroy({
    where: {
      id: moduleId,
    },
    include: [{ model: db.Lecture, as: 'lectures' }],
  });
  return moduleToDelete;
};

/**
 * Receives module: { name, catalog_id } and lecturerId
 *
 * Return a new, persisted module with
 */
module.exports.createModuleWithLecturers = async ({ name, catalog_id, lecturerId }) => {
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

    const lec = await lecService.findLecturerById(lecturerId);

    const moduleId = createdModule.dataValues.id;

    await createdModule.addLecturer(lec, {
      through: { model: db.Lecturer_Module },
    });

    await transaction.commit();

    return createdModule.dataValues;
  } catch (error) {
    console.log('createModule', error);
    transaction.rollback();
  }
};
