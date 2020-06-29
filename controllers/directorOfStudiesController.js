const responseHelper = require('../helpers/responseHelper');
const errorResponseHelper = require('../helpers/errorResponseHelper');
const checkPasswordHelper = require('../helpers/checkPasswordHelper');
const copyObjectHelper = require('../helpers/propertyCopyHelper');
const directorOfStudiesService = require('../services/directorOfStudiesService');
const authService = require('../services/authService');
const db = require('../database/database');

exports.putChangePassword = async (req, res, next) => {
  const { directorOfStudiesId } = req.query;
  const { oldPassword, newPassword } = req.body;
  const transaction = await db.sequelize.transaction();

  try {
    const passwordCheck = await checkPasswordHelper(Number(directorOfStudiesId), oldPassword);

    if (!passwordCheck) {
      throw new Error('Old password is wrong');
    }

    const updatedPasswordOfDirectorOfStudies = await directorOfStudiesService.changePasswordOfDirectorOfStudies(
      transaction,
      {
        directorOfStudies_id: directorOfStudiesId,
        password: newPassword,
        password_change_required: false,
      }
    );
    if (!updatedPasswordOfDirectorOfStudies) {
      throw new Error('No director of studies found to update');
    }

    transaction.commit();
    return responseHelper(res, 200, 'Successfully updated', { token: passwordCheck.token });
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, next, error);
  }
};

exports.getDirectorOfStudies = async (req, res, next) => {
  const directorOfStudies_id = req.token.directorOfStudies_id;

  try {
    const DirectorOfStudies = await directorOfStudiesService.getById(directorOfStudies_id);
    return responseHelper(res, 200, 'Successful', { DirectorOfStudies });
  } catch (error) {
    return errorResponseHelper(res, next, error);
  }
};

exports.putDirectorOfStudies = async (req, res, next) => {
  const directorOfStudies_id = req.token.directorOfStudies_id;
  const transaction = await db.sequelize.transaction();

  try {
    const givenDirectorOfStudies = copyObjectHelper(req.body, ['username', 'misc']);
    if (!givenDirectorOfStudies.username) {
      givenDirectorOfStudies.username = req.token.username;
    }
    givenDirectorOfStudies.username = givenDirectorOfStudies.username.trim();

    const existingDoSWithUsername = await directorOfStudiesService.getByUsername(givenDirectorOfStudies.username);
    if (existingDoSWithUsername && existingDoSWithUsername.directorOfStudies_id !== directorOfStudies_id) {
      throw new Error('The username is already taken');
    }
    const updatedDirectorOfStudies = await directorOfStudiesService.updateDirectorOfStudies(transaction, {
      directorOfStudies_id,
      ...givenDirectorOfStudies,
    });
    if (!updatedDirectorOfStudies) {
      throw new Error('No director of studies found to update');
    }
    const token = authService.generateToken({...req.token, username: givenDirectorOfStudies.username});

    transaction.commit();
    return responseHelper(res, 200, 'Successfully updated', { token });
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, next, error);
  }
};
