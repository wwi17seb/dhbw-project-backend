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
      misc: {
        type: DataTypes.TEXT,
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

  DirectorOfStudies.associate = (models) => {
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
    models.DirectorOfStudies.hasOne(models.Lecturer, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: true,
        name: 'createdBy_id',
      },
    });

    // n:m between DirectorOfStudies to Course
    models.DirectorOfStudies.belongsToMany(models.Course, {
      through: 'directorOfStudies_course',
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'course_id',
      },
    });
  };

  return DirectorOfStudies;
};
