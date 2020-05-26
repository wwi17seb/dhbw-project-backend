const db = require('../database/database');
const lecService = require('./lecturerService');

module.exports.findDirectorOfStudiesById = async (directorOfStudiesId) => {
  const foundedDirectorOfStudies = await db.DirectorOfStudies.findOne({ where: { id: directorOfStudiesId } });
  if (foundedDirectorOfStudies) return foundedDirectorOfStudies;
  return null;
};

module.exports.createDirectorOfStudies = async (transaction, User, Lecturer) => {
  const createdDirectorOfStudies = await db.DirectorOfStudies.create({ User }, { include: [{ model: db.User }] }, transaction);
  await lecService.createLecturer(null, Lecturer, createdDirectorOfStudies.dataValues.id, true);
  return createdDirectorOfStudies.dataValues;
};
