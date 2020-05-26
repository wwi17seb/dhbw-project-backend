const responseHelper = require("../helpers/responseHelper");

exports.postModules = async (req, res) => {
    responseHelper(res, 501, "Not yet implemented.");
};
exports.putModules = async (req, res) => {
    const moduleId = req.query.moduleId;
    responseHelper(res, 501, "Not yet implemented.");
};
exports.deleteModules = async (req, res) => {
    const moduleId = req.query.moduleId;
    responseHelper(res, 501, "Not yet implemented.");
};
