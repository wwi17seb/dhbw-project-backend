module.exports = (sequelize, DataTypes) => {
  const FieldOfStudy = sequelize.define(
    'FieldOfStudy',
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
    },
    {
      modelName: 'FieldOfStudy',
      tableName: 'field_of_study',
    }
  );

  FieldOfStudy.associate = function (models) {
    // 1:n between FieldOfStudy and MajorSubject
    models.FieldOfStudy.hasMany(models.MajorSubject, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'fieldOfStudy_id',
      },
    });

    // 1:n between course and semester
    models.FieldOfStudy.hasMany(models.ModuleGroup, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'fieldOfStudy_id',
      },
    });
  };
  return FieldOfStudy;
};
