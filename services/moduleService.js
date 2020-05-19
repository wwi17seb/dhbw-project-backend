const db = require("../database/database");

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

    const createdModule = await db.Module.create(
      {
        ...extractedModule,
      },
      transaction
    );

    await transaction.commit();

    return createdModule.dataValues;
  } catch (error) {
    console.log("createModule", error);
    transaction.rollback();
  }
};

/**
 * Returns all modules in the database 
 * as an array
 */
module.exports.getAllModules = async () => {
  const modules = await db.Module.findAll({
    include: [{ model: db.Lecturer, as: "lecturers" }],
  });
  return modules;
};

/**
 * Receives the name of module 
 *
 * Returns a module
 */
module.exports.getModuleByName = async (nameOfModule) => {
  const moduleToFind = await db.Module.findOne({
    where: {
      name: nameOfModule,
    },
    include: [{ model: db.Lecturer, as: "lecturers" }],
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
    include: [{ model: db.Lecturer, as: "lecturers" }],
  });
  return moduleToDelete;
};