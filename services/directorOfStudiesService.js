const db = require('../database/database');
const lecService = require('./lecturerService');

module.exports.findDirectorOfStudiesById = async (directorOfStudiesId) => {
  const foundedDirectorOfStudies = await db.DirectorOfStudies.findOne({ where: { id: directorOfStudiesId }, include: [{ model: db.Lecturer }] });
  if (foundedDirectorOfStudies) return foundedDirectorOfStudies;
  return null;
};

module.exports.createDirectorOfStudies = async (transaction, User, Lecturer) => {
  const createdDirectorOfStudies = await db.DirectorOfStudies.create({ User }, { include: [{ model: db.User }] }, transaction);
  await lecService.createLecturer(null, Lecturer, createdDirectorOfStudies.dataValues.id, true);
  return createdDirectorOfStudies.dataValues;
};

// PUT
module.exports.updateDiretorOfStudies = async (transaction, { directorOfStudiesId, misc }) => {
  const directorOfStudies = await this.findDirectorOfStudiesById(directorOfStudiesId);
  await directorOfStudies.update({ misc }, transaction);
  return directorOfStudies.dataValues;
};

// Delete
module.exports.deleteDiretorOfStudies = async (transaction, directorOfStudiesId) => {
  const counter = await db.DirectorOfStudies.destroy({ where: { id: directorOfStudiesId } }, transaction);
  return counter > 0;
};
