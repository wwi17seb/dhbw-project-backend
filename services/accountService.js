const db = require('../database/database');

const authService = require('./authService');

module.exports.getAccountByUsername = async (username) => {
  const AccountToFind = await db.Account.findOne({ where: { username } });
  return (await AccountToFind) ? AccountToFind.dataValues : null;
};

module.exports.getAccountById = async (account_id) => {
  const AccountToFind = await db.Account.findOne({ where: { account_id } });
  return AccountToFind.dataValues;
};

module.exports.createAccount = async (transaction, { username, password, isAdmin }) => {
  const hashedPassword = await authService.hashPassword(password);
  const createdAccount = await db.Account.create({ username, password: hashedPassword, is_admin: isAdmin }, transaction);

  return createdAccount.dataValues;
};

// PUT
/*
 * Returns updated values
 */

module.exports.update = async (transaction, { account_id, usernmae, password, is_admin }) => {
  const accountToUpdate = await this.getAccountById(account_id);
  const hashedPassword = await authService.hashPassword(password);
  await accountToUpdate.update({ usernmae, password: hashedPassword, is_admin }, { where: { account_id } }, transaction);

  return accountToUpdate.dataValues;
};

// DELETE
/*
 * Returns boolean
 */
module.exports.deleteAccount = async (transaction, account_id) => {
  const counter = await db.Account.destroy({ where: { account_id } }, transaction);
  return counter > 0;
};
