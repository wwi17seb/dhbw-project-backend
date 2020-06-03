const responseHelper = require('../helpers/responseHelper');
const db = require('../database/database');
const academicRecordService = null; //require('../services/academicRecordService');

// TODO: remove error as soon as they are implemented.

const throwError = () => {
  throw false;
};

exports.getAcademicRecords = async (req, res) => {
  try {
    throwError(); // TODO: REMOVE!
    const AcademicRecords = await academicRecordService.findAll();
    responseHelper(res, 200, '', { AcademicRecords });
  } catch (error) {
    responseHelper(res, 500, 'Internal Server Error');
  }
};

exports.postAcademicRecords = async (req, res) => {
  let transaction = await db.sequelize.transaction();
  try {
    throwError(); // TODO: REMOVE!
    let academicRecordToCreate = req.body;
    let createdAcademicRecord = await academicRecordService.createAcademicRecord(transaction, academicRecordToCreate);
    transaction.commit();
    return responseHelper(res, 201, 'Successfully created', createdAcademicRecord);
  } catch (error) {
    transaction.rollback();
    return responseHelper(res, 500, 'Internal Server Error.');
  }
};

exports.putAcademicRecords = async (req, res) => {
  const academicRecordId = req.query.academicRecordId;
  let transaction = await db.sequelize.transaction();
  try {
    throwError(); // TODO: REMOVE!
    let academicRecordToUpdate = copyObjectHelper(req.body, ['abbreviation', 'type', 'rated']);
    let updatedAcademicRecord = await academicRecordService.updateAcademicRecord(transaction, {
      academicRecord_id: academicRecordId,
      abbreviation: academicRecordToUpdate.abbreviation,
      type: academicRecordToUpdate.type,
      rated: academicRecordToUpdate.rated,
    });
    transaction.commit();
    return responseHelper(res, 200, 'Successfully updated', updatedAcademicRecord);
  } catch (error) {
    transaction.rollback();
    return responseHelper(res, 500, 'Internal Server Error.');
  }
};

exports.deleteAcademicRecords = async (req, res) => {
  const academicRecordId = req.query.academicRecordId;
  let transaction = await db.sequelize.transaction();
  try {
    throwError(); // TODO: REMOVE!
    let deletedAcademicRecord = await academicRecordService.deleteAcademicRecord(transaction, academicRecordId);
    transaction.commit();
    return responseHelper(res, 200, 'Successfully deleted', deletedAcademicRecord);
  } catch (error) {
    transaction.rollback();
    return responseHelper(res, 500, 'Internal Server Error.');
  }
};
