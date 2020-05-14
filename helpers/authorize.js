const authService = require('../services/authService');

module.exports = authorize;

function authorize () {
  return (req, res, next) => {
    const token = authService.verifyToken(req.body.token);
    if (token) {
      req.token = token;
      next();
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  }
};