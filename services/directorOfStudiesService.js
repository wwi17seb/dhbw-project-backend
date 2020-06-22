const db = require('../database/database');
const authService = require('./authService');

// GET
module.exports.getByUsername = async (username) => {
  const directorOfStudiesToFind = await db.DirectorOfStudies.findOne({ where: { username } });

  return directorOfStudiesToFind ? directorOfStudiesToFind.dataValues : null;
};

module.exports.getById = async (id) => {
  const directorOfStudiesToFind = await db.DirectorOfStudies.findOne({
    where: { directorOfStudies_id: id },
    attributes: ['directorOfStudies_id', 'username', 'is_admin', 'misc'],
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

module.exports.changePasswordOfDirectorOfStudies = async (transaction, { directorOfStudies_id, password }) => {
  const hashedPw = authService.hashPassword(password); // FIXME: quick question: why did we hash the pw on the database when creating, but hash it ourselves here?

  const updatedDirectorOfStudies = await db.DirectorOfStudies.update(
    { password: hashedPw },
    { where: { directorOfStudies_id }, transaction }
  );

  return updatedDirectorOfStudies > 0;
};

// POST
module.exports.createDirectorOfStudies = async (transaction, DirectorOfStudies) => {
  const createdDirectorOfStudies = await db.DirectorOfStudies.create(DirectorOfStudies, { transaction });

  return createdDirectorOfStudies.dataValues;
};
