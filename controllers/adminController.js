const responseHelper = require('../helpers/responseHelper');
const errorResponseHelper = require('../helpers/errorResponseHelper');
const checkPrivilegesHelper = require('../helpers/checkPrivilegesHelper');
const directorOfStudiesService = require('../services/directorOfStudiesService');
const db = require('../database/database');

exports.createUser = async (req, res, next) => {
  const directorOfStudiesToCheck_id = req.token.directorOfStudies_id;
  const { username, password } = req.body;

  if (!checkPrivilegesHelper(directorOfStudiesToCheck_id)){
    return responseHelper(res, 403, 'You do not have the privileges to perform this task!');
  }
  if (!username) {
    return responseHelper(res, 400, 'No username was given!');
  }
  if (!password) {
    return responseHelper(res, 400, 'No password was given!');
  }

  const directorOfStudiesExists = await directorOfStudiesService.getByUsername(username);
  if (directorOfStudiesExists) {
    return responseHelper(res, 400, 'Username already exists');
  }
  
  const directorOfStudiesToCreate = { username, password };
  const transaction = await db.sequelize.transaction();

  try {
    const createdDirectorOfStudies = await directorOfStudiesService.createDirectorOfStudies(
      transaction,
      directorOfStudiesToCreate
    );

    transaction.commit();
    return responseHelper(res, 201, 'Successful', {
      directorOfStudies_id: createdDirectorOfStudies.directorOfStudies_id,
      username: createdDirectorOfStudies.username,
    });
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, next, error);
  }
};
