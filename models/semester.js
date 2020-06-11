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
      },
      number: {
        type: DataTypes.STRING,
      },
      start_date: {
        type: DataTypes.DATE,
      },
      end_date: {
        type: DataTypes.DATE,
      },
    },
    {
      modelName: 'Semester',
      tableName: 'semester',
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
  return Semester;
};
