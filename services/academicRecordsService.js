const db = require('../database/database');

// GET
module.exports.findAll = async () => {
  const academicRecord = await db.AcademicRecord.findAll();

  return academicRecord;
};

// POST
module.exports.createAcademicRecord = async (transaction, { academicRecord_id, abbreviation, type, rated }) => {
  const academicRecord = await db.AcademicRecord.create(
    { academicRecord_id, abbreviation, type, rated },
    { transaction }
  );

  return academicRecord.dataValues;
};

// PUT
module.exports.updateAcademicRecord = async (transaction, { academicRecord_id, abbreviation, type, rated }) => {
  const academicRecord = await db.AcademicRecord.update(
    { abbreviation, type, rated },
    { where: { academicRecord_id }, transaction }
  );

  return academicRecord > 0;
};

// DELETE
module.exports.deleteAcademicRecord = async (transaction, academicRecord_id) => {
  const counter = await db.AcademicRecord.destroy({ where: { academicRecord_id }, transaction });

  return counter > 0;
};
