const db = require('../database/database');
const moduleService = require('./moduleService');
const majorSubjectService = require('./majorSubjectService');

const whatToInclude = [
  {
    model: db.Module,
    include: [{ model: db.AcademicRecord }, { model: db.Lecture, include: [{ model: db.MainFocus }] }],
  },
];

async function findModuleGroupById(moduleGroup_id) {
  const moduleGroupToFind = await db.ModuleGroup.findOne({ where: { moduleGroup_id }, include: whatToInclude });

  return moduleGroupToFind ? moduleGroupToFind.dataValues : null;
}

// GET
module.exports.getAllModuleGroups = async () => {
  // TODO: fieldOfStudy ist falsch
  const moduleGroup = await db.ModuleGroup.findAll({ include: whatToInclude });

  return moduleGroup;
};

module.exports.getAllModuleGroupsByMajorSubjectId = async (majorSubject_id) => {
  const moduleGroup = await db.ModuleGroup.findAll({ where: { majorSubject_id }, include: whatToInclude });

  return moduleGroup;
};

// POST
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
          const dbLecture = await db.Lecture.findOne({ where: { lecture_id: Lecture.lecture_id }, transaction });
          await dbLecture.addMainFocuses(lectureToCreate.mainFocus_ids, { transaction });
          return dbLecture;
        })
      );
      return Module;
    })
  );

  return createdModuleGroup;
};

// PUT
module.exports.updateModuleGroup = async (
  transaction,
  {
    moduleGroup_id,
    majorSubject_id,
    name,
    number_of_modules_to_attend,
    from_semester_number,
    to_semester_number,
    Modules,
  }
) => {
  const moduleGroup = await db.ModuleGroup.update(
    { majorSubject_id, name, number_of_modules_to_attend, from_semester_number, to_semester_number },
    {
      where: { moduleGroup_id },
      transaction,
    }
  );
  const oldModuleGroup = await findModuleGroupById(moduleGroup_id);

  const modulesToBeIncluded = {};
  await Promise.all(
    Modules.map(async (Module) => {
      const id = Module.module_id;
      if (id) {
        modulesToBeIncluded[id] = Module;
      } else {
        await moduleService.createModule(transaction, { moduleGroup_id, ...Module });
      }
    })
  );

  await Promise.all(
    oldModuleGroup.Modules.map(async (oldModule) => {
      const oldModuleId = oldModule.module_id;
      if (oldModuleId in modulesToBeIncluded) {
        const moduleToUpdate = modulesToBeIncluded[oldModuleId];
        await moduleService.updateModule(transaction, { moduleGroup_id, module_id: oldModuleId, ...moduleToUpdate });
      } else {
        await moduleService.deleteModule(transaction, oldModuleId);
      }
    })
  );

  return moduleGroup > 0;
};

// DELETE
module.exports.deleteModuleGroup = async (transaction, moduleGroup_id) => {
  const counter = await db.ModuleGroup.destroy({ where: { moduleGroup_id }, transaction });

  return counter > 0;
};
