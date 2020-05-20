const db = require("../database/database");

const authService = require("./authService");
module.exports.getUserByUsername = async (username) => {
  const userToFind = await db.User.findOne({
    where: {
      username: username,
    },
  });
  return await userToFind ? userToFind.dataValues : null;
};

module.exports.getUserById = async (user_id) => {
  const userToFind = await db.User.findOne({
    where: {
      id: user_id,
    },
  });
  return userToFind.dataValues;
};

module.exports.createUser = async (user) => {
  let transaction;
  const { username, password, isAdmin } = user;
  try {
    transaction = await db.sequelize.transaction(); // Managed Transaction
    const hashedPassword = await authService.hashPassword(password);
    const createdUser = await db.User.create(
      {
        username: username,
        password: hashedPassword,
        is_admin: isAdmin,
      },
      transaction
    );

    await transaction.commit();

    return createdUser.dataValues;
  } catch (error) {
    console.log("createUser", error);
    transation.rollback();
  }
};

module.exports.update = async (user) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction();

    const updatedUser = await db.User.update(
      {
        user,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    transaction = await transaction.commit();

    return updatedUser.dataValues;
  } catch (error) {
    console.log("update user", error);
    transaction.rollback();
  }
};
