module.exports = (sequelize, DataTypes) => {
  const Presentation = sequelize.define(
    'Presentation',
    {
      presentation_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      modelName: 'Presentation',
      tableName: 'presentation',
    }
  );

  Presentation.associate = (models) => {
    // 1:n between presentation and lecture
    Presentation.Lecture = models.Presentation.belongsTo(models.Lecture, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'lecture_id',
      },
    });

    // 1:n between presentation and lecturer
    Presentation.Lecturer = models.Presentation.belongsTo(models.Lecturer, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: true,
        name: 'lecturer_id',
      },
    });

    // 1:n between presentation and directorOfStudies
    models.Presentation.belongsTo(models.DirectorOfStudies, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'directorOfStudies_id',
      },
    });

    // 1:n between presentation and course
    Presentation.Course = models.Presentation.belongsTo(models.Course, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'course_id',
      },
    });

    // 1:n between presentation and semester
    models.Presentation.belongsTo(models.Semester, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'semester_id',
      },
    });

    // 1:n between presentation and academic record
    Presentation.AcademicRecord = models.Presentation.belongsTo(models.AcademicRecord, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: true,
        name: 'academicRecord_id',
      },
    });
  };
  return Presentation;
};
