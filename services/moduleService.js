const db = require("../database/database");

module.exports.createModule = async ({name, catalog_id, Lecturers}) => {

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

module.exports.getAllModules = async () => {
  const modules = await db.Module.findAll({
    include: [{ model: db.Lecturer }],
  });
  return modules;
};

module.exports.getModuleByName = async (nameOfModule) => {
  const moduleToFind = await db.Module.findOne({
    where: {
      name: nameOfModule,
    },
  });
  return moduleToFind;
};
