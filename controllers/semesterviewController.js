const responseHelper = require("../helpers/responseHelper");

exports.getSemesterview = async (req, res) => {
    const courseId = req.query.courseId;
    responseHelper(res, 501, "Not yet implemented.");
};
