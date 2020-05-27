const semesterviewService = require('../services/semesterService');
const authService = require('../services/authService');
const responseHelper = require('../helpers/responseHelper');

exports.getSemesterview = async (req, res, next) => {
  responseHelper(res, 501, 'Not yet implemented.');
};
exports.putSemesterview = async (req, res, next) => {
  responseHelper(res, 501, 'Not yet implemented.');
};

// not used - see ../docs/api.md for more info
// exports.deleteSemesterview = async (req, res, next) => {
//     responseHelper(res, 501, "Not yet implemented.");
// };
// exports.postSemesterview = async (req, res, next) => {
//     responseHelper(res, 501, "Not yet implemented.");
// };
