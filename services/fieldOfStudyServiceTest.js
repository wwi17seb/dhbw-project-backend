const { createFieldOfStudy, deleteFieldOfStudy } = require('./fieldOfStudyService');

module.exports.createFieldOfStudy = async () => {
  const fieldOfStudy = await createFieldOfStudy(null, 'Sascha');
  return fieldOfStudy;
};

// Delete
// receives (fieldOfStudyId)
/*
 * Returns boolean
 */
module.exports.deleteFieldOfStudy = async (fieldOfStudy_id) => {
  const counter = await deleteFieldOfStudy(null, fieldOfStudy_id);
  return counter > 0;
};
