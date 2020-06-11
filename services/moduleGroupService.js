const db = require('../database/database');
const lectureService = require('./lectureService');

const whatToInclude = [
  {
    model: db.Module,
    include: [{ model: db.AcademicRecord }, { model: db.Lecture, include: [{ model: db.MainFocus }] }],
  },
];

/*
 * Receives moduleGroup_id
 *
 * Returns founded moduleGroup
 */
module.exports.findModuleGroupById = async (moduleGroup_id) => {
  const moduleGroupToFind = await db.ModuleGroup.findOne({ where: { moduleGroup_id }, include: whatToInclude });
  return moduleGroupToFind.dataValues;
};

/*
 * Receives name of moduleGroup
 *
 * Returns founded moduleGroup
 */
module.exports.findModuleGroupByName = async (moduleGroupName) => {
  const moduleGroupToFind = await db.ModuleGroup.findOne({ where: { name: moduleGroupName }, include: whatToInclude });
  return moduleGroupToFind.dataValues;
};

/*
 * Returns all moduleGroups []
 */
module.exports.getAllModuleGroups = async () => {
  const moduleGroup = await db.ModuleGroup.findAll({ include: whatToInclude });

  return moduleGroup;
};

/*
 * Returns all moduleGroups []
 */
module.exports.getAllModuleGroupsByMajorSubjectId = async (majorSubject_id) => {
  const moduleGroup = await db.ModuleGroup.findAll({ where: { majorSubject_id }, include: whatToInclude });

  return moduleGroup;
};

// POST
/*
 * Receives moduleGroup: { name, number_of_modules_to_attend, from_semester_number, to_semester_number }
 * creates a new moduleGroup
 */
module.exports.createModuleGroup = async (
  transaction,
  { majorSubject_id, name, number_of_modules_to_attend, from_semester_number, to_semester_number, Modules }
) => {
  const moduleGroupToCreate = {
    majorSubject_id,
    name,
    number_of_modules_to_attend,
    from_semester_number,
    to_semester_number,
    Modules,
  };

  console.log('moduleGroupToCreate', moduleGroupToCreate);

  const moduleGroup = await db.ModuleGroup.create(moduleGroupToCreate, {
    transaction,
    include: [
      {
        association: db.ModuleGroup.Module,
        include: [{ association: db.Module.Lecture }],
      },
    ],
  });

  const createdModuleGroup = moduleGroup.get({ plain: true });
  let createdModules = createdModuleGroup.Modules;
  const moduleIds = {},
    lectureIds = {};
  function getModuleIdentifier(mod) {
    return `${mod.name} ${mod.catalog_id}`;
  }
  function getLectureIdentifier(mod, lect) {
    return `${mod.module_id} ${lect.name} ${lect.catalog_id}`;
  }
  createdModules.forEach((createdModule) => {
    moduleIds[getModuleIdentifier(createdModule)] = createdModule.module_id;
    createdModule.Lectures.forEach((createdLecture) => {
      lectureIds[getLectureIdentifier(createdModule, createdLecture)] = createdLecture.lecture_id;
    });
  });

  // result = createdModules.reduce((map, obj) => ((map[getModuleIdentifier(obj)] = obj.module_id), map), {});
  // console.log('result', result);

  createdModules = await Promise.all(
    createdModules.map(async (Module) => {
      const moduleToCreate = Modules.find((mod) => moduleIds[getModuleIdentifier(mod)] === Module.module_id);
      await (
        await db.Module.findOne({ where: { module_id: Module.module_id }, transaction })
      ).addAcademicRecords(moduleToCreate.academicRecord_ids, { transaction });
      Module.Lectures = await Promise.all(
        Module.Lectures.map(async (Lecture) => {
          const lectureToCreate = moduleToCreate.Lectures.find(
            (lec) => lectureIds[getLectureIdentifier(Module, lec)] === Lecture.lecture_id
          );
          return await (
            await db.Lecture.findOne({ where: { lecture_id: Lecture.lecture_id }, transaction })
          ).addMainFocuses(lectureToCreate.mainFocus_ids, { transaction });
        })
      );
      return Module;
    })
  );

  return createdModuleGroup;
};

// PUT
/*
 * Receives moduleGroup: { moduleGroup_id, name, number_of_modules_to_attend, from_semester_number, to_semester_number }
 * updates a moduleGroup
 *
 * return boolean of succeeding
 */
module.exports.updateModuleGroup = async (
  transaction,
  { moduleGroup_id, majorSubject_id, name, number_of_modules_to_attend, from_semester_number, to_semester_number }
) => {
  const moduleGroup = await db.ModuleGroup.update(
    { majorSubject_id, name, number_of_modules_to_attend, from_semester_number, to_semester_number },
    {
      where: { moduleGroup_id },
      transaction,
      include: [
        {
          model: db.ModuleGroup.Module,
          include: [
            { model: db.Module.AcademicRecord },
            { model: db.Module.Lecture, include: [{ model: db.Lecture.MainFocus }] },
          ],
        },
      ],
    }
  );
  return moduleGroup > 0;
};

// Delete
/*
 * Receives transaction, moduleGroup_id
 * deletes a moduleGroup
 *
 * return boolean of succeeding
 */
module.exports.deleteModuleGroup = async (transaction, moduleGroup_id) => {
  const counter = await db.ModuleGroup.destroy({ where: { moduleGroup_id }, transaction });
  return counter > 0;
};
