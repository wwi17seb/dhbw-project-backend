module.exports = (sequelize, DataTypes) => {
  const MajorSubject = sequelize.define(
    'MajorSubject',
    {
      majorSubject_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      modelName: 'MajorSubject',
      tableName: 'majorSubject',
    }
  );

  MajorSubject.associate = (models) => {
    // 1:n between majorSubject and course
    models.MajorSubject.hasMany(models.Course, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'majorSubject_id',
      },
    });

    // 1:n between majorSubject and moduleGroup
    models.MajorSubject.hasMany(models.ModuleGroup, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'majorSubject_id',
      },
    });

    // 1:n between majorSubject and fieldOfStudy
    models.MajorSubject.belongsTo(models.FieldOfStudy, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'fieldOfStudy_id',
      },
    });
  };
  return MajorSubject;
};
