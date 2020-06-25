const directorOfStudiesService = require('../services/directorOfStudiesService');

module.exports = checkPrivilege;

async function checkPrivilege(id) {
  const directorOfStudiesToCheck = await directorOfStudiesService.getById(id);
  return directorOfStudiesToCheck.is_admin;
}
