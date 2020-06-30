module.exports = (sequelize, DataTypes) => {
  const FieldOfStudy = sequelize.define(
    'FieldOfStudy',
    {
      fieldOfStudy_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      modelName: 'FieldOfStudy',
      tableName: 'fieldOfStudy',
      name: { plural: 'FieldsOfStudy' },
    }
  );

  FieldOfStudy.associate = (models) => {
    // 1:n between FieldOfStudy and MajorSubject
    FieldOfStudy.MajorSubject = models.FieldOfStudy.hasMany(models.MajorSubject, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'fieldOfStudy_id',
      },
    });
  };

  // create scope for default ordering
  FieldOfStudy.addScope(
    'defaultScope',
    {
      order: sequelize.col('name'),
    },
    { override: true }
  );

  return FieldOfStudy;
};
