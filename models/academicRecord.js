module.exports = (sequelize, DataTypes) => {
  const AcademicRecord = sequelize.define(
    'AcademicRecord',
    {
      academicRecord_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      abbreviation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      modelName: 'AcademicRecord',
      tableName: 'academicRecord',
    }
  );

  AcademicRecord.associate = (models) => {
    // n:m between module and academic record
    AcademicRecord.Module = models.AcademicRecord.belongsToMany(models.Module, {
      through: 'module_academicRecord',
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'academicRecord_id',
      },
    });

    // 1:n between academic record and presentation
    AcademicRecord.Presentation = models.AcademicRecord.hasMany(models.Presentation, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: true,
        name: 'academicRecord_id',
      },
    });
  };

  // create scope for default ordering
  AcademicRecord.addScope(
    'defaultScope',
    {
      order: sequelize.col('abbreviation'),
    },
    { override: true }
  );

  return AcademicRecord;
};
