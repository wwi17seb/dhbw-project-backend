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
      },
      type: {
        type: DataTypes.STRING,
      },
      rated: {
        type: DataTypes.BOOLEAN,
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
        allowNull: false,
        name: 'academicRecord_id',
      },
    });
  };
  return AcademicRecord;
};
