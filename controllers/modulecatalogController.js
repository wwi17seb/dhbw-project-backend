const responseHelper = require('../helpers/responseHelper');
const moduleGroupService = require('../services/moduleGroupService');
const moduleService = require('../services/moduleService');
const db = require('../database/database');

exports.getModulecatalog = async (req, res) => {
  const majorSubjectId = req.query.majorSubjectId;

  if (majorSubjectId) {
    try {
      const FieldsOfStudy = await moduleGroupService.getAllModuleGroupsByMajorSubjectId(majorSubjectId);

      return responseHelper(res, 200, 'Successful', { FieldsOfStudy });
    } catch (error) {
      transaction.rollback();
      return next(error);
    }
  } else {
    return responseHelper(res, 400, 'No Major Subject ID Given');
  }
};
