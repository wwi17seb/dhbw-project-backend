'use strict';
module.exports = (sequelize, DataTypes) => {
  const DirectorOfStudies = sequelize.define('DirectorOfStudies', {}, {
    modelName: 'DirectorOfStudies',
    tableName: 'directorOfStudies'
  });

  DirectorOfStudies.associate = function (models) {
    models.DirectorOfStudies.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
        name: "user_id",
      }
    });
    models.DirectorOfStudies.belongsTo(models.Lecturer, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
        name: "lecturer_id",
      }
    });

    // n:m DirectorOfStudies to Course
    models.DirectorOfStudies.belongsToMany(models.Course, {
      through: "directorOfStudies_course",
      onDelete: "CASCADE",
      foreignKey: { 
        allowNull: false,
        name: "course_id",
      }
    });
  };

  return DirectorOfStudies;
};