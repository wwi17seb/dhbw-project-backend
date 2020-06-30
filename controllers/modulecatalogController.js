const responseHelper = require('../helpers/responseHelper');
const errorResponseHelper = require('../helpers/errorResponseHelper');
const moduleGroupService = require('../services/moduleGroupService');
const majorSubjectService = require('../services/majorSubjectService');

exports.getModulecatalog = async (req, res) => {
  const majorSubjectId = req.query.majorSubjectId;
  try {
    if (!majorSubjectId) {
      throw new Error('No major subject given');
    }
    const MajorSubject = await majorSubjectService.findMajorSubjectById(majorSubjectId);
    if (!MajorSubject) {
      throw new Error('Major subject could not be found');
    }
    const ModuleGroups = await moduleGroupService.getAllModuleGroupsByMajorSubjectId(majorSubjectId);

    return responseHelper(res, 200, 'Successful', { MajorSubject, ModuleGroups });
  } catch (error) {
    return errorResponseHelper(res, error);
  }
};
