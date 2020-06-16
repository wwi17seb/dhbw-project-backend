const majorSubjectService = require('../services/majorSubjectService');

exports.checkMajorSubjectExistence = async function (majorSubject_id) {
  const majorSubject = await majorSubjectService.findMajorSubjectById(majorSubject_id);
  if (!majorSubject) {
    throw new Error('Major subject could not be found');
  }
  return true;
};
