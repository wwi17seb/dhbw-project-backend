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

module.exports.update = async (transaction, user) => {
  const updatedUser = await db.User.update({ user }, { where: { id: user.id } }, transaction);
  transaction = await transaction.commit();

  return updatedUser.dataValues;
};
