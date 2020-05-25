'use strict';
module.exports = (sequelize, DataTypes) => {
  const DirectorOfStudies = sequelize.define(
    'DirectorOfStudies',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      lecturer_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      modelName: 'DirectorOfStudies',
      tableName: 'directorOfStudies',
    }
  );

  DirectorOfStudies.associate = function (models) {
    // 1:1 between director of studies and user
    models.DirectorOfStudies.belongsTo(models.User, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'user_id',
      },
    });

    // TODO: Cyclic dependency found. directorOfStudies is dependent of itself.
    // 1:1 between lecturer and director of studies
    /*  models.DirectorOfStudies.belongsTo(models.Lecturer, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: true,
        name: 'lecturer_id',
      },
    }); */

    // n:m between DirectorOfStudies to Course
    models.DirectorOfStudies.belongsToMany(models.Course, {
      through: 'directorOfStudies_course',
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'course_id',
      },
    });

    // 1:n between lecturer and dos
    models.DirectorOfStudies.hasMany(models.Lecturer, {
      onDelete: 'CASCADE',
      foreignKey: 'createdBy_id',
    });
  };

  return DirectorOfStudies;
};
