const responseHelper = require('../helpers/responseHelper');
const errorResponseHelper = require('../helpers/errorResponseHelper');
const copyObjectHelper = require('../helpers/propertyCopyHelper');
const db = require('../database/database');
const academicRecordService = require('../services/academicRecordsService');

exports.getAcademicRecords = async (req, res, next) => {
  try {
    const AcademicRecords = await academicRecordService.findAll();
    responseHelper(res, 200, 'Successful', { AcademicRecords });
  } catch (error) {
    return errorResponseHelper(res, next, error);
  }
};

exports.postAcademicRecords = async (req, res, next) => {
  const transaction = await db.sequelize.transaction();

  try {
    const academicRecordToCreate = req.body;
    const createdAcademicRecord = await academicRecordService.createAcademicRecord(transaction, academicRecordToCreate);

    transaction.commit();
    return responseHelper(res, 201, 'Successfully created', createdAcademicRecord);
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, next, error);
  }
};

exports.putAcademicRecords = async (req, res, next) => {
  const academicRecordId = req.query.academicRecordId;
  const transaction = await db.sequelize.transaction();

  try {
    if (!academicRecordId) {
      throw new Error('No academic record given');
    }

    const academicRecordToUpdate = copyObjectHelper(req.body, ['abbreviation', 'type']);
    const updatedAcademicRecord = await academicRecordService.updateAcademicRecord(transaction, {
      academicRecord_id: academicRecordId,
      abbreviation: academicRecordToUpdate.abbreviation,
      type: academicRecordToUpdate.type,
    });
    if (!updatedAcademicRecord) {
      throw new Error('No academic record found to update');
    }

    transaction.commit();
    return responseHelper(res, 200, 'Successfully updated', updatedAcademicRecord);
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, next, error);
  }
};

exports.deleteAcademicRecords = async (req, res, next) => {
  const academicRecordId = req.query.academicRecordId;
  const transaction = await db.sequelize.transaction();

  try {
    if (!academicRecordId) {
      throw new Error('No academic record given');
    }
    const deletedAcademicRecord = await academicRecordService.deleteAcademicRecord(transaction, academicRecordId);
    if (!deletedAcademicRecord) {
      throw new Error('No academic record found to delete');
    }

    transaction.commit();
    return responseHelper(res, 200, 'Successfully deleted', deletedAcademicRecord);
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, next, error);
  }
};
