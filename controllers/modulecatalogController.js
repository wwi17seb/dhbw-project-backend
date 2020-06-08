const responseHelper = require("../helpers/responseHelper");

exports.getModulcatalog = async (req, res) => {
    const majorSubjectId = req.query.majorSubjectId;
    responseHelper(res, 501, "Not yet implemented.");
};
