const db = require('../database/database');

/*
 * Returns founded course
 */
module.exports.findAcademicRecordById = async (academicRecord_id) => {
  const academicRecord = await db.AcademicRecord.findOne({ where: { academicRecord_id } });
  return academicRecord ? academicRecord.dataValues : null;
};

/*
 * Returns founded AcademicRecord
 */
module.exports.findAcademicRecordByName = async (academicRecordName) => {
  const academicRecord = await db.AcademicRecord.findOne({ where: { name: academicRecordName } });
  return academicRecord ? academicRecord.dataValues : null;
};

// GET
// AcademicRecord
/*
 * Returns all AcademicRecords
 */
module.exports.findAll = async () => {
  const academicRecord = await db.AcademicRecord.findAll();
  return academicRecord.dataValues;
};

// POST
module.exports.createAcademicRecord = async (transaction, { name, academicRecord_id, abbreviation, type, rated }) => {
  const academicRecord = await db.AcademicRecord.create(
    { name, academicRecord_id, abbreviation, type, rated },
    { transaction }
  );

  return academicRecord.dataValues;
};

// PUT
// wie post s.o.
// receives (academicRecord) -> name, academicRecord_id, abbreviation, type, rated
module.exports.updateAcademicRecord = async (transaction, { name, academicRecord_id, abbreviation, type, rated }) => {
  const academicRecord = await AcademicRecord.update(
    { name, abbreviation, type, rated },
    { where: { academicRecord_id }, transaction }
  );
  return academicRecord > 0;
};

// Delete
// receives (academicRecord_id)
module.exports.deleteAcademicRecord = async (transaction, academicRecord_id) => {
  const counter = await db.AcademicRecord.destroy({ where: { academicRecord_id }, transaction });
  return counter > 0;
};
