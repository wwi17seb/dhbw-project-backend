const responseHelper = require("../helpers/responseHelper");

exports.postPresentations = async (req, res) => {
    responseHelper(res, 501, "Not yet implemented.");
};
exports.putPresentations = async (req, res) => {
    const presentationId = req.query.presentationId;
    responseHelper(res, 501, "Not yet implemented.");
};
exports.deletePresentations = async (req, res) => {
    const presentationId = req.query.presentationId;
    responseHelper(res, 501, "Not yet implemented.");
};
