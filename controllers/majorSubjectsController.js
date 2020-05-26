const responseHelper = require("../helpers/responseHelper");

exports.getMajorSubjects = async (req, res) => {
    const fieldOfStudyId = req.query.fieldOfStudyId;
    responseHelper(res, 501, "Not yet implemented.");
};
exports.postMajorSubjects = async (req, res) => {
    responseHelper(res, 501, "Not yet implemented.");
};
exports.putMajorSubjects = async (req, res) => {
    const majorSubjectId = req.query.majorSubjectId;
    responseHelper(res, 501, "Not yet implemented.");
};
exports.deleteMajorSubjects = async (req, res) => {
    const majorSubjectId = req.query.majorSubjectId;
    responseHelper(res, 501, "Not yet implemented.");
};
