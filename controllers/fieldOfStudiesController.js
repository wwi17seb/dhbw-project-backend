const responseHelper = require("../helpers/responseHelper");

exports.getFieldOfStudies = async (req, res) => {
    const withMajorSubjects = req.query.withMajorSubjects;
    responseHelper(res, 501, "Not yet implemented.");
};
exports.postFieldOfStudies = async (req, res) => {
    responseHelper(res, 501, "Not yet implemented.");
};
exports.putFieldOfStudies = async (req, res) => {
    const fieldOfStudyId = req.query.fieldOfStudyId;
    responseHelper(res, 501, "Not yet implemented.");
};
exports.deleteFieldOfStudies = async (req, res) => {
    const fieldOfStudyId = req.query.fieldOfStudyId;
    responseHelper(res, 501, "Not yet implemented.");
};
