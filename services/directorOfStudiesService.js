const db = require('../database/database');
const lecService = require('./lecturerService');

module.exports.findDirectorOfStudiesById = async (directorOfStudies_id) => {
  const foundedDirectorOfStudies = await db.DirectorOfStudies.findOne({ where: { directorOfStudies_id }, include: [{ model: db.Lecturer }] });
  if (foundedDirectorOfStudies) return foundedDirectorOfStudies;
  return null;
};

module.exports.createDirectorOfStudies = async (transaction, User, Lecturer) => {
  const createdDirectorOfStudies = await db.DirectorOfStudies.create({ User }, { include: [{ model: db.User }] }, transaction);
  await lecService.createLecturer(null, Lecturer, createdDirectorOfStudies.dataValues.directorOfStudies_id);
  return createdDirectorOfStudies.dataValues;
};

// PUT
module.exports.updateDiretorOfStudies = async (transaction, { directorOfStudies_id, misc }) => {
  const directorOfStudies = await this.findDirectorOfStudiesById(directorOfStudies_id);
  await directorOfStudies.update({ misc }, transaction);
  return directorOfStudies.dataValues;
};

// Delete
module.exports.deleteDiretorOfStudies = async (transaction, directorOfStudies_id) => {
  const counter = await db.DirectorOfStudies.destroy({ where: { directorOfStudies_id } }, transaction);
  return counter > 0;
};
