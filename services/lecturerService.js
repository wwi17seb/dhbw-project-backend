const db = require("../database/database");

const directorOfStudiesService = require("./directorOfStudiesService");

module.exports.findLecturerById = async (lecturerId) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction(); // Managed Transaction

    const Lecturer = await db.Lecturer.findOne(
      {
        where: {
          id: lecturerId,
        },
      },
      transaction
    );

    await transaction.commit();

    return Lecturer;
  } catch (error) {
    console.log("findLecturerById", error);
    transaction.rollback();
  }
};

// directorOfStudiesId represents the director of studies adding the new lecturer
module.exports.createLecturer = async (lecturer, directorOfStudiesId) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction(); // Managed Transaction

    //const directorOfStudies = await directorOfStudiesService.findDirectorOfStudiesById(directorOfStudiesId);
    //console.log('post dos directorOfStudies:', directorOfStudies);
    const Lecturer = await db.Lecturer.create(
      {
        ...lecturer,
        createdBy_id: directorOfStudiesId,
      },
      {
        include: [
          {
            model: db.DirectorOfStudies,
          },
        ],
      },
      transaction
    );

    await transaction.commit();

    return Lecturer.dataValues;
  } catch (error) {
    console.log("createLecturer", error);
    transaction.rollback();
  }
};

module.exports.findByDirectorOfStudiesId = async (directorOfStudiesId) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction(); // Managed Transaction

    const Lecturers = await db.Lecturer.find(
      {
        where: {
          directorOfStudies_id: directorOfStudiesId,
        },
      },
      transaction
    );

    await transaction.commit();

    return Lecturers.dataValues;
  } catch (error) {
    console.log("findByDirectorOfStudiesId", error);
    transaction.rollback();
  }
};
