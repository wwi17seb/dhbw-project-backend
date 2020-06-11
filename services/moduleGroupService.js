const db = require('../database/database');

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

// whatToPersist = [{ association: db.Module, include: [db.Module] }];
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

  const moduleGroup = await db.ModuleGroup.create(
    { ...moduleGroupToCreate },
    {
      transaction,
      include: [
        {
          association: db.ModuleGroup.Module,
          include: [{ association: db.Module.Lecture, include: [{ association: db.Lecture.MainFocus }] }],
        },
      ],
    }
  );

  return moduleGroup.dataValues;
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
    { where: { moduleGroup_id }, transaction }
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
