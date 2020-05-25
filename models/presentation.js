module.exports = (sequelize, DataTypes) => {
  const Presentation = sequelize.define(
    'Presentation',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      modelName: 'Presentation',
      tableName: 'presentation',
    }
  );

  Presentation.associate = (models) => {
    // 1:1 betwenn presentation and academic lecture
    models.Presentation.belongsTo(models.Lecture, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'lecture_id',
      },
    });

    // 1:1 betwenn presentation and academic record
    models.Presentation.belongsTo(models.AcademicRecord, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'academicRecord_id',
      },
    });

    // n:m betwenn presentation and lecturer
    models.Presentation.belongsToMany(models.Lecturer, {
      through: 'presentation_lecturer',
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'lecturer_id',
      },
    });

    // 1:1 betwenn presentation and semester
    models.Presentation.belongsTo(models.Semester, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'semester_id',
      },
    });

    // 1:1 betwenn presentation and course
    models.Presentation.belongsTo(models.Course, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'course_id',
      },
    });

    // 1:1 betwenn presentation and director of studies
    models.Presentation.belongsTo(models.DirectorOfStudies, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'createdBy_id',
      },
    });
  };
  return Presentation;
};
