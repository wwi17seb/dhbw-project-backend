const db = require('../database/database');
const acService = require('./academicRecordsService');

// GET
module.exports.getAllModules = async ({ withLecture, withAcademicRecord, withModuleGroup }) => {
  const whatToInclude = [];
  if (withLecture) whatToInclude.push({ model: db.Lecture, as: 'lectures' });
  if (withAcademicRecord) whatToInclude.push({ model: db.AcademicRecord, as: 'academicRecords' });
  if (withModuleGroup) whatToInclude.push({ model: db.ModuleGroup, as: 'moduleGroup' });

  const modules = await db.Module.findAll({ include: whatToInclude });

  return modules;
};

// POST
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

  const createdModule = await db.Module.create(extractedModule, { transaction });
  createdModule.addAcademicRecords(academicRecord_ids);

  return createdModule.dataValues;
};

// PUT
module.exports.updateModule = async (transaction, { module_id, name, requirements, ects }) => {
  const moduleToUpdate = await db.Module.update(
    { module_id, name, requirements, ects },
    { where: { module_id }, transaction }
  );

  return moduleToUpdate > 0;
};

// DELETE
module.exports.delete = async (module_id) => {
  const counter = await db.Module.destroy({
    where: { module_id },
    include: [{ model: db.Lecture, as: 'lectures' }],
  });

  return counter > 0;
};
