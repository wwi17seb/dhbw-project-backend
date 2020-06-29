const responseHelper = require('../helpers/responseHelper');
const errorResponseHelper = require('../helpers/errorResponseHelper');
const checkPrivilegesHelper = require('../helpers/checkPrivilegesHelper');
const { getLocalKey, setLocalKey, LOCAL_KEYS } = require('../helpers/localKeysFileHelper');
const directorOfStudiesService = require('../services/directorOfStudiesService');
const db = require('../database/database');

exports.postCreateUser = async (req, res) => {
  const directorOfStudiesToCheck_id = req.token.directorOfStudies_id;
  const { username, password } = req.body;

  if (!(await checkPrivilegesHelper(directorOfStudiesToCheck_id))) {
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
    const createdDirectorOfStudies = await directorOfStudiesService.createDirectorOfStudies(transaction, {
      ...directorOfStudiesToCreate,
      password_change_required: true,
    });

    transaction.commit();
    return responseHelper(res, 201, 'Successful', {
      directorOfStudies_id: createdDirectorOfStudies.directorOfStudies_id,
      username: createdDirectorOfStudies.username,
    });
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, error);
  }
};

exports.putResetPassword = async (req, res) => {
  const directorOfStudiesToCheck_id = req.token.directorOfStudies_id;
  const { newPassword } = req.body;
  const directorOfStudiesToChange_id = req.query.directorOfStudiesId;
  const transaction = await db.sequelize.transaction();

  if (!(await checkPrivilegesHelper(directorOfStudiesToCheck_id))) {
    return responseHelper(res, 403, 'You do not have the privileges to perform this task!');
  }
  try {
    const updatedPasswordOfDirectorOfStudies = await directorOfStudiesService.changePasswordOfDirectorOfStudies(
      transaction,
      {
        directorOfStudies_id: directorOfStudiesToChange_id,
        password: newPassword,
        password_change_required: true,
      }
    );
    if (!updatedPasswordOfDirectorOfStudies) {
      throw new Error('No director of studies found to update');
    }

    transaction.commit();
    return responseHelper(res, 200, 'Successfully updated', updatedPasswordOfDirectorOfStudies);
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, error);
  }
};

exports.putUpgradeToAdmin = async (req, res) => {
  const directorOfStudiesToCheck_id = req.token.directorOfStudies_id;
  const directorOfStudiesToUpgrade_id = req.query.directorOfStudiesId;
  const transaction = await db.sequelize.transaction();

  if (!(await checkPrivilegesHelper(directorOfStudiesToCheck_id))) {
    return responseHelper(res, 403, 'You do not have the privileges to perform this task!');
  }
  try {
    const upgradedDirectorOfStudies = await directorOfStudiesService.upgradeDirectorOfStudies(transaction, {
      directorOfStudies_id: directorOfStudiesToUpgrade_id,
      is_admin: true,
    });
    if (!upgradedDirectorOfStudies) {
      throw new Error('No director of studies found to update');
    }

    transaction.commit();
    return responseHelper(res, 200, 'Successfully updated', upgradedDirectorOfStudies);
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, error);
  }
};

exports.getRegisterKey = async (req, res) => {
  const directorOfStudiesToCheck_id = req.token.directorOfStudies_id;

  if (!(await checkPrivilegesHelper(directorOfStudiesToCheck_id))) {
    return responseHelper(res, 403, 'You do not have the privileges to perform this task!');
  }

  const registerKey = await getLocalKey(LOCAL_KEYS.REGISTER_KEY);
  return responseHelper(res, 200, 'Successful', { registerKey });
};

exports.putRegisterKey = async (req, res) => {
  const directorOfStudiesToCheck_id = req.token.directorOfStudies_id;
  const { registerKey } = req.body;

  if (!(await checkPrivilegesHelper(directorOfStudiesToCheck_id))) {
    return responseHelper(res, 403, 'You do not have the privileges to perform this task!');
  }
  if (registerKey && typeof registerKey !== 'string') {
    return responseHelper(res, 400, 'Register key must be a string or falsy');
  }

  try {
    setLocalKey(LOCAL_KEYS.REGISTER_KEY, registerKey);
    return responseHelper(res, 200, 'Successfully updated', true);
  } catch (error) {
    return errorResponseHelper(res, error);
  }
};
