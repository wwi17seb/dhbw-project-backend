const db = require('../database/database');

module.exports.findDirectorOfStudiesById = async (directorOfStudiesId) => {
  const foundedDirectorOfStudies = await db.DirectorOfStudies.findOne({ where: { id: directorOfStudiesId } });
  if (foundedDirectorOfStudies) return foundedDirectorOfStudies;
  return null;
};

module.exports.createDirectorOfStudies = async (transaction, user, lecturer) => {
  const createdDirectorOfStudies = await db.DirectorOfStudies.create(
    { User: user, Lecturer: lecturer },
    { include: [{ model: db.User }, { model: db.Lecturer }] },
    transaction
  );
  return createdDirectorOfStudies;
};
