'use strict';
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    'Course',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      googleCalendarId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      modelName: 'Course',
      tableName: 'course',
    }
  );

  Course.associate = (models) => {
    //n:m
    models.Course.belongsToMany(models.DirectorOfStudies, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'course_id',
      },
      through: 'directorOfStudies_course',
    });

    // 1:n between course and semester
    models.Course.hasMany(models.Semester, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'course_id',
      },
    });
  };

  return Course;
};
