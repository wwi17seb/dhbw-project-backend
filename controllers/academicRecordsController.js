const responseHelper = require("../helpers/responseHelper");

exports.getAcademicRecords = async (req, res) => {
    responseHelper(res, 501, "Not yet implemented.");
};

exports.postAcademicRecords = async (req, res) => {
    responseHelper(res, 501, "Not yet implemented.");
};

exports.putAcademicRecords = async (req, res) => {
    const academicRecordId = req.query.academicRecordId;
    responseHelper(res, 501, "Not yet implemented.");
};

exports.deleteAcademicRecords = async (req, res) => {
    const academicRecordId = req.query.academicRecordId;
    responseHelper(res, 501, "Not yet implemented.");
};
