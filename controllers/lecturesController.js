const lecturesService = require('../services/lecturesService');
const responseHelper = require("../helpers/responseHelper");

exports.postLectures = async (req, res) => {
    responseHelper(res, 501, "Not yet implemented.");
};
exports.putLectures = async (req, res) => {
    const lectureId = req.query.lectureId;
    responseHelper(res, 501, "Not yet implemented.");
};
exports.deleteLectures = async (req, res) => {
    const lectureId = req.query.lectureId;
    responseHelper(res, 501, "Not yet implemented.");
};
