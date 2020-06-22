const directorOfStudiesService = require('../services/directorOfStudiesService');

module.exports = checkPrivilege;

function checkPrivilege(id) {
  const directorOfStudiesToCheck = directorOfStudiesService.getById(id);
  return directorOfStudiesToCheck.is_admin;
}
