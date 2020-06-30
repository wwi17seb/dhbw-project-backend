module.exports = (sequelize, DataTypes) => {
  const Semester = sequelize.define(
    'Semester',
    {
      semester_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      modelName: 'Semester',
      tableName: 'semester',
      indexes: [
        {
          unique: true,
          fields: ['course_id', 'number'],
        },
      ],
    }
  );

  Semester.associate = (models) => {
    // 1:n between semester and presentation
    Semester.Presentation = models.Semester.hasMany(models.Presentation, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'semester_id',
      },
    });

    // n:1 between semester and course
    Semester.Course = models.Semester.belongsTo(models.Course, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'course_id',
      },
    });
  };

  // create scope for default ordering
  Semester.addScope(
    'defaultScope',
    {
      order: sequelize.col('semester_id'),
    },
    { override: true }
  );

  return Semester;
};
