const PATH_MODELS = '../models';

const User = require(PATH_MODELS + '/user');
const DirectorOfStudies  = require(PATH_MODELS + '/directorOfStudies');

DirectorOfStudies.belongsTo(User, {
    foreignKey: "user_id",
    constrains: true
});

