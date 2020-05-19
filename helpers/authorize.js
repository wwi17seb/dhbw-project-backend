const authService = require('../services/authService');
const responseHelper = require("../helpers/responseHelper");

module.exports = authorize;

function authorize () {
  return (req, res, next) => {
    const token = authService.verifyToken(req.query.token);
    if (token) {
      req.token = token;
      next();
    } else {
      responseHelper(res, 401, 'Unauthorized' );
    }
  }
};