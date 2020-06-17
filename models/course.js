'use strict';
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    'Course',
    {
      course_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      google_calendar_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      modelName: 'Course',
      tableName: 'course',
    }
  );

  Course.associate = (models) => {
    //n:m
    Course.DirectorOfStudies = models.Course.belongsToMany(models.DirectorOfStudies, {
      onDelete: 'CASCADE',
      through: 'directorOfStudies_course',
      foreignKey: {
        allowNull: false,
        name: 'course_id',
      },
    });

    // 1:n between course and semester
    Course.Semester = models.Course.hasMany(models.Semester, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'course_id',
      },
    });

    // 1:n between course and presentation
    Course.Presentation = models.Course.hasMany(models.Presentation, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'course_id',
      },
    });

    // n:1 between course and majorSubject
    Course.MajorSubject = models.Course.belongsTo(models.MajorSubject, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'majorSubject_id',
      },
    });
  };

  return Course;
};