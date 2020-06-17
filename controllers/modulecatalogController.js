const responseHelper = require('../helpers/responseHelper');
const { checkMajorSubjectExistence } = require('../helpers/checkExistenceHelper');
const errorResponseHelper = require('../helpers/errorResponseHelper');
const moduleGroupService = require('../services/moduleGroupService');

exports.getModulecatalog = async (req, res, next) => {
  const majorSubjectId = req.query.majorSubjectId;
  try {
    if (!majorSubjectId) {
      throw new Error('No major subject given');
    }

    await checkMajorSubjectExistence(majorSubjectId);
    // TODO: get fieldOfStudy and majorSubject
    const ModuleGroups = await moduleGroupService.getAllModuleGroupsByMajorSubjectId(majorSubjectId);

    return responseHelper(res, 200, 'Successful', { ModuleGroups });
  } catch (error) {
    return errorResponseHelper(res, next, error);
  }
};
