const responseHelper = require('../helpers/responseHelper');
const errorResponseHelper = require('../helpers/errorResponseHelper');
const authService = require('../services/authService');
const directorOfStudiesService = require('../services/directorOfStudiesService');
const db = require('../database/database');

const ERROR_MESSAGE_AUTH_FAILED = 'AUTH FAILED';

exports.postLogin = (req, res, next) => {
  const { username, password } = req.body;
  let loadedUser;

  // check if a user exists
  directorOfStudiesService
    .getByUsername(username)
    .then((user) => {
      if (!user) {
        return responseHelper(res, 401, ERROR_MESSAGE_AUTH_FAILED);
      }
      loadedUser = user;
      return loadedUser;
    })
    .then((user) => {
      // if user exists compare the passwords to get log in
      return authService.verifyPassword(password, user.password);
    })
    .then((doMatch) => {
      if (doMatch) {
        const token = authService.generateToken(loadedUser);

        return responseHelper(res, 200, 'Token generated!', {
          token,
          directorOfStudies_id: loadedUser.directorOfStudies_id,
          username: loadedUser.username,
        });
      } else {
        return responseHelper(res, 401, ERROR_MESSAGE_AUTH_FAILED);
      }
    })
    .catch((err) => {
      return errorResponseHelper(res, next, err);
    });
};

exports.postSignup = async (req, res, next) => {
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
    return responseHelper(res, 201, 'Successful', {
      token,
      directorOfStudies_id: createdDirectorOfStudies.directorOfStudies_id,
      username: createdDirectorOfStudies.username,
    });
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, next, error);
  }
};

exports.postLogout = (req, res, next) => {
  responseHelper(res, 200, 'Not yet implemented!');
};
