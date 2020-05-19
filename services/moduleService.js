const db = require("../database/database");

module.exports.createModule = async (moduleToCreate) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction(); // Managed Transaction

    const createdModule = await db.Module.create(
      {
        ...moduleToCreate,
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
  const modules = await db.Module.findAll();
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
