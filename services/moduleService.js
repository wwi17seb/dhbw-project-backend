const db = require('../database/database');
const lectureService = require('./lectureService');

async function findModuleById(module_id) {
  const Module = await db.Module.findOne({
    where: { module_id },
    include: [{ model: db.Lecture, include: [db.MainFocus] }],
  });

  return Module ? Module.dataValues : null;
}

// GET
module.exports.getAllModules = async ({ withLecture, withAcademicRecord, withModuleGroup }) => {
  const whatToInclude = [];
  if (withLecture) whatToInclude.push({ model: db.Lecture, as: 'lectures' });
  if (withAcademicRecord) whatToInclude.push({ model: db.AcademicRecord, as: 'academicRecords' });
  if (withModuleGroup) whatToInclude.push({ model: db.ModuleGroup, as: 'moduleGroup' });

  const modules = await db.Module.findAll({ include: whatToInclude });

  return modules;
};

// POST
module.exports.createModule = async (
  transaction,
  {
    moduleGroup_id,
    name,
    description,
    ects,
    catalog_id,
    number_of_lectures_to_attend,
    requirements,
    academicRecord_ids,
    Lectures,
  }
) => {
  const extractedModule = {
    moduleGroup_id,
    name,
    description,
    ects,
    catalog_id,
    number_of_lectures_to_attend,
    requirements,
    academicRecord_ids,
    Lectures,
  };

  const createdModule = await db.Module.create(extractedModule, {
    include: [{ association: db.Module.Lecture }],
    transaction,
  });
  await createdModule.addAcademicRecords(academicRecord_ids, { transaction });

  // addMainFocuses for Lectures
  const plainModule = createdModule.get({ plain: true });
  const lectureIds = {};

  function getLectureIdentifier(lect) {
    return `${lect.name} ${lect.catalog_id}`;
  }
  plainModule.Lectures.forEach((createdLecture) => {
    lectureIds[getLectureIdentifier(createdLecture)] = createdLecture.lecture_id;
  });

  plainModule.Lectures = await Promise.all(
    plainModule.Lectures.map(async (Lecture) => {
      const lectureToCreate = Lectures.find((lec) => lectureIds[getLectureIdentifier(lec)] === Lecture.lecture_id);
      const dbLecture = await db.Lecture.findOne({ where: { lecture_id: Lecture.lecture_id }, transaction });
      await dbLecture.addMainFocuses(lectureToCreate.mainFocus_ids, { transaction });
    })
  );

  return createdModule.dataValues;
};

// PUT
module.exports.updateModule = async (
  transaction,
  {
    moduleGroup_id,
    name,
    description,
    ects,
    catalog_id,
    number_of_lectures_to_attend,
    requirements,
    academicRecord_ids,
    module_id,
    Lectures,
  }
) => {
  const moduleToUpdate = await db.Module.findOne({ where: { module_id } });
  await moduleToUpdate.update(
    {
      moduleGroup_id,
      name,
      description,
      ects,
      catalog_id,
      number_of_lectures_to_attend,
      requirements,
    },
    { transaction }
  );
  await moduleToUpdate.setAcademicRecords(academicRecord_ids, { transaction });

  // update lectures
  const oldModule = await findModuleById(module_id);

  const lecturesToBeIncluded = {};
  await Promise.all(
    Lectures.map(async (Lecture) => {
      const id = Lecture.lecture_id;
      if (id) {
        lecturesToBeIncluded[id] = Lecture;
      } else {
        await lectureService.createLecture(transaction, { module_id, ...Lecture });
      }
    })
  );

  await Promise.all(
    oldModule.Lectures.map(async (oldLecture) => {
      const oldLectureId = oldLecture.lecture_id;
      if (oldLectureId in lecturesToBeIncluded) {
        // update lecture
        const lectureToUpdate = lecturesToBeIncluded[oldLectureId];
        await lectureService.updateLecture(transaction, lectureToUpdate);
      } else {
        // delete lecture
        await lectureService.deleteLecture(transaction, oldLectureId);
      }
    })
  );

  return moduleToUpdate > 0;
};

// DELETE
module.exports.deleteModule = async (transaction, module_id) => {
  const counter = await db.Module.destroy({
    where: { module_id },
    transaction,
  });

  return counter > 0;
};
