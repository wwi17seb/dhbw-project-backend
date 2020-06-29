const responseHelper = require('../helpers/responseHelper');
const errorResponseHelper = require('../helpers/errorResponseHelper');
const copyObjectHelper = require('../helpers/propertyCopyHelper');
const authService = require('../services/authService');
const directorOfStudiesService = require('../services/directorOfStudiesService');
const db = require('../database/database');
const checkPasswordHelper = require('../helpers/checkPasswordHelper');
const checkRegisterKeyHelper = require('../helpers/checkRegisterKeyHelper');

const ERROR_MESSAGE_AUTH_FAILED = 'AUTH FAILED';

exports.postLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    var passwordCheck = await checkPasswordHelper(username, password);
  } catch (error) {
    return errorResponseHelper(res, error);
  }
  if (passwordCheck) {
    const propertiesToReturn = copyObjectHelper(passwordCheck.directorOfStudies, [
      'directorOfStudies_id',
      'username',
      'is_admin',
      'password_change_required',
    ]);
    if (passwordCheck.directorOfStudies.password_change_required) {
      return responseHelper(res, 200, 'Successful Login but password change is required', { ...propertiesToReturn });
    }
    return responseHelper(res, 200, 'Token generated!', {
      token: passwordCheck.token,
      ...propertiesToReturn,
    });
  } else {
    return responseHelper(res, 401, ERROR_MESSAGE_AUTH_FAILED);
  }
};

exports.postSignup = async (req, res) => {
  const { username, password } = req.body;

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
    const token = authService.generateToken(createdDirectorOfStudies);

    transaction.commit();
    return responseHelper(res, 201, '[DEPRECATED: YOU SHOULD NO LONGER USE THIS ROUTE] Successful', {
      token,
      directorOfStudies_id: createdDirectorOfStudies.directorOfStudies_id,
      username: createdDirectorOfStudies.username,
    });
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, error);
  }
};

exports.register = async (req, res) => {
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

  const directorOfStudiesExists = await directorOfStudiesService.getByUsername(username);
  if (directorOfStudiesExists) {
    return responseHelper(res, 400, 'Username already exists');
  }

  const directorOfStudiesToCreate = { username, password };
  const transaction = await db.sequelize.transaction();

  try {
    if (!checkRegisterKeyHelper(registerKey)) {
      throw new Error('Register key is invalid');
    }

    const createdDirectorOfStudies = await directorOfStudiesService.createDirectorOfStudies(
      transaction,
      directorOfStudiesToCreate
    );
    const token = authService.generateToken(createdDirectorOfStudies);

    transaction.commit();
    return responseHelper(res, 201, 'Successful', {
      directorOfStudies_id: createdDirectorOfStudies.directorOfStudies_id,
      username: createdDirectorOfStudies.username,
      is_admin: createdDirectorOfStudies.is_admin,
      token,
    });
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, error);
  }
};

exports.postLogout = (req, res) => {
  responseHelper(res, 200, 'Not yet implemented!');
};
