const db = require("../database/database");
const authService = require("./authService");

module.exports.createDirectorOfStudies = async (user, lecturer) => {
  user.password = await authService.hashPassword(user.password);
  let transaction;
  try {
    transaction = await db.sequelize.transaction(); // Managed Transaction

    const DirectorOfStudies = await db.DirectorOfStudies.create(
      {
        User: user,
        Lecturer: lecturer,
      },
      {
        include: [
          {
            model: db.User,
          },
          {
            model: db.Lecturer,
          },
        ],
      },
      transaction
    );

    await transaction.commit();

    return DirectorOfStudies;
  } catch (error) {
    console.log("createDirectorOfStudies", error);
    transaction.rollback();
  }
};

module.exports.findDirectorOfStudiesById = async (directorOfStudiesId) => {

  const directorOfStudies = await db.DirectorOfStudies.findByPk(directorOfStudiesId);
  if (directorOfStudies) return directorOfStudies.dataValues;
  return null
  ;
};
