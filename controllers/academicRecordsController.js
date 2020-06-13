const responseHelper = require('../helpers/responseHelper');
const copyObjectHelper = require('../helpers/propertyCopyHelper');
const db = require('../database/database');
const academicRecordService = require('../services/academicRecordsService');

exports.getAcademicRecords = async (req, res, next) => {
  try {
    const AcademicRecords = await academicRecordService.findAll();
    responseHelper(res, 200, '', { AcademicRecords });
  } catch (error) {
    return next(error);
  }
};

exports.postAcademicRecords = async (req, res, next) => {
  let transaction = await db.sequelize.transaction();
  try {
    let academicRecordToCreate = req.body;
    let createdAcademicRecord = await academicRecordService.createAcademicRecord(transaction, academicRecordToCreate);
    transaction.commit();
    return responseHelper(res, 201, 'Successfully created.', createdAcademicRecord);
  } catch (error) {
    transaction.rollback();
    return next(error);
  }
};

exports.putAcademicRecords = async (req, res, next) => {
  const academicRecordId = req.query.academicRecordId;
  let transaction = await db.sequelize.transaction();
  try {
    let academicRecordToUpdate = copyObjectHelper(req.body, ['abbreviation', 'type', 'rated']);
    let updatedAcademicRecord = await academicRecordService.updateAcademicRecord(transaction, {
      academicRecord_id: academicRecordId,
      abbreviation: academicRecordToUpdate.abbreviation,
      type: academicRecordToUpdate.type,
      rated: academicRecordToUpdate.rated,
    });
    transaction.commit();
    return responseHelper(res, 200, 'Successfully updated.', updatedAcademicRecord);
  } catch (error) {
    transaction.rollback();
    return next(error);
  }
};

exports.deleteAcademicRecords = async (req, res, next) => {
  const academicRecordId = req.query.academicRecordId;
  let transaction = await db.sequelize.transaction();
  try {
    let deletedAcademicRecord = await academicRecordService.deleteAcademicRecord(transaction, academicRecordId);
    transaction.commit();
    return responseHelper(res, 200, 'Successfully deleted.', deletedAcademicRecord);
  } catch (error) {
    transaction.rollback();
    return next(error);
  }
};
