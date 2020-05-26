const db = require('../database/database');

const authService = require('./authService');

module.exports.getUserByUsername = async (username) => {
  const userToFind = await db.User.findOne({ where: { username } });
  return (await userToFind) ? userToFind.dataValues : null;
};

module.exports.getUserById = async (user_id) => {
  const userToFind = await db.User.findOne({ where: { id: user_id } });
  return userToFind.dataValues;
};

module.exports.createUser = async (transaction, user) => {
  const { username, password, isAdmin } = user;

  const hashedPassword = await authService.hashPassword(password);
  const createdUser = await db.User.create({ username, password: hashedPassword, is_admin: isAdmin }, transaction);

  return createdUser.dataValues;
};

// PUT
/*
 * Returns updated values
 */

module.exports.update = async (transaction, { id, username, password, is_admin }) => {
  const updatedUser = await this.getUserById(id);
  const hashedPassword = await authService.hashPassword(password);
  await updatedUser.update({ username, password: hashedPassword, is_admin }, { where: { id } }, transaction);

  return updatedUser.dataValues;
};

// DELETE
/*
 * Returns boolean
 */
module.exports.deleteUser = async (transaction, userId) => {
  const counter = await db.User.destroy({ where: { id: userId } }, transaction);
  return counter > 0;
};
