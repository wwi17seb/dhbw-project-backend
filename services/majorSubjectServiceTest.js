const majorSubjectService = require('./majorSubjectService');

module.exports.testAllMajorSubject = async () => {
  const allMajorSubjects = await majorSubjectService.findAll();
  console.log('---------allMajorSubjects', allMajorSubjects);
};
module.exports.testCreateMajorSubject = async (fieldOfStudy_id) => {
  console.log('create majorSubject');
  const createMajorSubject = await majorSubjectService.createMajorSubject(null, 'Test-Subject', fieldOfStudy_id);
  console.log('---------createMajorSubject', createMajorSubject);
};
