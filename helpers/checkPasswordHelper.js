const directorOfStudiesService = require('../services/directorOfStudiesService');
const authService = require('../services/authService');

module.exports = checkPassword;

async function checkPassword(directorOfStudiesIdOrUsername, password) {
  let directorOfStudies = null;
  if (typeof directorOfStudiesIdOrUsername === 'string') {
    directorOfStudies = await directorOfStudiesService.getByUsername(directorOfStudiesIdOrUsername);
  } else {
    directorOfStudies = await directorOfStudiesService.getById(directorOfStudiesIdOrUsername, true);
  }
  if (!directorOfStudies) {
    return false;
  }
  const doPasswordsMatch = await authService.verifyPassword(password, directorOfStudies.password);
  if (!doPasswordsMatch) {
    return false;
  }

  const token = authService.generateToken(directorOfStudies);

  return { token, directorOfStudies };
}
