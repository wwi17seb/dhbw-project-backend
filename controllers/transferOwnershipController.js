const responseHelper = require('../helpers/responseHelper');
const errorResponseHelper = require('../helpers/errorResponseHelper');
const directorOfStudiesService = require('../services/directorOfStudiesService');
const db = require('../database/database');

async function updateModel(transaction, model, oldDirectorOfStudiesId, newDirectorOfStudiesId) {
  const updated = await model.update(
    { createdBy_id: newDirectorOfStudiesId },
    { where: { createdBy_id: oldDirectorOfStudiesId }, transaction }
  );
  return Boolean(updated);
}

async function updateCourse(transaction, oldDirectorOfStudiesId, newDirectorOfStudiesId) {
  // get all courses to which oldDoS has access and newDoS does not
  const courses = await db.sequelize.query(
    `SELECT course_id
        FROM public."directorOfStudies_course"
        WHERE "directorOfStudies_id" = :oldDirectorOfStudiesId
    EXCEPT
    SELECT course_id
        FROM public."directorOfStudies_course"
        WHERE "directorOfStudies_id" = :newDirectorOfStudiesId;`,
    {
      replacements: { oldDirectorOfStudiesId, newDirectorOfStudiesId },
      type: db.Sequelize.QueryTypes.SELECT,
      transaction,
    }
  );

  // update from old to new (where new is not yet dos)
  if (courses.length > 0) {
    await db.sequelize.query(
      `UPDATE public."directorOfStudies_course"
        SET "directorOfStudies_id" = :newDirectorOfStudiesId
        WHERE "directorOfStudies_id" = :oldDirectorOfStudiesId AND "course_id" IN(:courseIds);`,
      {
        replacements: {
          oldDirectorOfStudiesId,
          newDirectorOfStudiesId,
          courseIds: courses.map((course) => course.course_id),
        },
        type: db.Sequelize.QueryTypes.UPDATE,
        transaction,
      }
    );
  }

  // remove remaining courses where old still is dos (because old and new both had responsibility before)
  await db.sequelize.query(
    `DELETE FROM public."directorOfStudies_course"
        WHERE "directorOfStudies_id" = :oldDirectorOfStudiesId;`,
    {
      replacements: { oldDirectorOfStudiesId },
      type: db.Sequelize.QueryTypes.DELETE,
      transaction,
    }
  );
}

exports.getAllUsersForTransfer = async (req, res) => {
  try {
    const Users = await directorOfStudiesService.getAllUsersForTransfer();
    return responseHelper(res, 200, 'Successful', { Users });
  } catch (error) {
    return errorResponseHelper(res, error);
  }
};

exports.transferOwnership = async (req, res) => {
  const oldDirectorOfStudiesId = req.token.directorOfStudies_id;
  const newDirectorOfStudiesId = req.body.newOwnerId;
  const transaction = await db.sequelize.transaction();

  try {
    await Promise.all(
      [db.Lecturer, db.Presentation, db.Course].map(async (model) => {
        if (model === db.Course) {
          return await updateCourse(transaction, oldDirectorOfStudiesId, newDirectorOfStudiesId);
        }
        return await updateModel(transaction, model, oldDirectorOfStudiesId, newDirectorOfStudiesId);
      })
    );

    transaction.commit();
    return responseHelper(res, 200, 'Successfully transferred', true);
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, error);
  }
};
