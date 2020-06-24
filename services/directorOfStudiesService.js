const db = require('../database/database');

// GET
module.exports.getByUsername = async (username) => {
  const directorOfStudiesToFind = await db.DirectorOfStudies.findOne({
    where: {
      username: {
        [db.Sequelize.Op.iLike]: username,
      },
    },
  });

  return directorOfStudiesToFind ? directorOfStudiesToFind.dataValues : null;
};

module.exports.getById = async (directorOfStudies_id, withPassword = false) => {
  const attributes = ['directorOfStudies_id', 'username', 'is_admin', 'misc'];
  if (withPassword) attributes.push('password');
  const directorOfStudiesToFind = await db.DirectorOfStudies.findOne({
    where: { directorOfStudies_id },
    attributes,
  });

  return directorOfStudiesToFind ? directorOfStudiesToFind.dataValues : null;
};

// PUT
module.exports.updateDirectorOfStudies = async (transaction, { directorOfStudies_id, username, misc }) => {
  const updatedDirectorOfStudies = await db.DirectorOfStudies.update(
    { username, misc },
    { where: { directorOfStudies_id }, transaction }
  );

  return updatedDirectorOfStudies > 0;
};

module.exports.changePasswordOfDirectorOfStudies = async (
  transaction,
  { directorOfStudies_id, password, password_change_required }
) => {
  const updatedDirectorOfStudies = await db.DirectorOfStudies.update(
    { password, password_change_required },
    { where: { directorOfStudies_id }, transaction }
  );

  return updatedDirectorOfStudies > 0;
};

module.exports.upgradeDirectorOfStudies = async (transaction, { directorOfStudies_id, is_admin }) => {
  const upgradedDirectorOfStudies = await db.DirectorOfStudies.update(
    { is_admin },
    { where: { directorOfStudies_id }, transaction }
  );

  return upgradedDirectorOfStudies > 0;
};

// POST
module.exports.createDirectorOfStudies = async (transaction, DirectorOfStudies) => {
  DirectorOfStudies.username = DirectorOfStudies.username.trim();
  const createdDirectorOfStudies = await db.DirectorOfStudies.create(DirectorOfStudies, { transaction });

  return createdDirectorOfStudies.dataValues;
};
