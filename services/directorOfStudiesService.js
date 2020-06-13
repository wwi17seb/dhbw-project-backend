const db = require('../database/database');

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

// POST
module.exports.createDirectorOfStudies = async (transaction, DirectorOfStudies) => {
  const createdDirectorOfStudies = await db.DirectorOfStudies.create(DirectorOfStudies, { transaction });

  return createdDirectorOfStudies.dataValues;
};
