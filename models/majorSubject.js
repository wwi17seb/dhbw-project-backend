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
        allowNull: false,
      },
      catalog_effective_from: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      modelName: 'MajorSubject',
      tableName: 'majorSubject',
    }
  );

  MajorSubject.associate = (models) => {
    // 1:n between majorSubject and course
    MajorSubject.Course = models.MajorSubject.hasMany(models.Course, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'majorSubject_id',
      },
    });

    // 1:n between majorSubject and moduleGroup
    MajorSubject.ModuleGroup = models.MajorSubject.hasMany(models.ModuleGroup, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'majorSubject_id',
      },
    });

    // 1:n between majorSubject and fieldOfStudy
    MajorSubject.FieldOfStudy = models.MajorSubject.belongsTo(models.FieldOfStudy, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'fieldOfStudy_id',
      },
    });
  };

  // create scope for default ordering
  MajorSubject.addScope(
    'defaultScope',
    {
      order: [
        ['catalog_effective_from', 'DESC'],
        ['name', 'ASC'],
      ],
    },
    { override: true }
  );

  return MajorSubject;
};
