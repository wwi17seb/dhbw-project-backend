const responseHelper = require('../helpers/responseHelper');
const errorResponseHelper = require('../helpers/errorResponseHelper');
const checkRegisterKeyHelper = require('../helpers/checkRegisterKeyHelper');
const checkOldPasswordHelper = require('../helpers/checkOldPasswordHelper');
const copyObjectHelper = require('../helpers/propertyCopyHelper');
const directorOfStudiesService = require('../services/directorOfStudiesService');
const db = require('../database/database');

exports.register = async (req, res, next) => {
  const { username, password, registerKey } = req.body;

  if (!registerKey) {
    return responseHelper(res, 400, 'No register key was given!');
  }
  if (!username) {
    return responseHelper(res, 400, 'No username was given!');
  }
  if (!password) {
    return responseHelper(res, 400, 'No password was given!');
  }
  if (!checkRegisterKeyHelper(registerKey)){
    throw new Error('Register key is invalid');
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

exports.putChangePassword = async (req, res, next) => {
  const directorOfStudies_id = req.token.directorOfStudies_id;
  const givenDirectorOfStudies = copyObjectHelper(req.body, ['oldPassword', 'newPassword']);
  const transaction = await db.sequelize.transaction();
  
  try {
    if (!checkOldPasswordHelper(directorOfStudies_id, givenDirectorOfStudies.oldPassword)) {
      throw new Error('Old password is wrong')
    }

    const updatedPasswordOfDirectorOfStudies = await directorOfStudiesService.changePasswordOfDirectorOfStudies(
      transaction,
      {
        directorOfStudies_id,
        password: givenDirectorOfStudies.newPassword,
      }
    );
    if (!updatedPasswordOfDirectorOfStudies) {
      throw new Error('No director of studies found to update');
    }

    transaction.commit();
    return responseHelper(res, 200, 'Successfully updated', updatedPasswordOfDirectorOfStudies);
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, next, error);
  }
};

exports.putDirectorOfStudies = async (req, res, next) => {
  const directorOfStudies_id = req.token.directorOfStudies_id;
  const transaction = await db.sequelize.transaction();
  
  try {
    const givenDirectorOfStudies = copyObjectHelper(req.body, ['username', 'misc']);
    
    const updatedDirectorOfStudies = await directorOfStudiesService.updateDirectorOfStudies(transaction, {
      directorOfStudies_id,
      ...givenDirectorOfStudies,
    });
    if (!updatedDirectorOfStudies) {
      throw new Error('No director of studies found to update');
    }

    transaction.commit();
    return responseHelper(res, 200, 'Successfully updated', updatedDirectorOfStudies);
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, next, error);
  }
};
