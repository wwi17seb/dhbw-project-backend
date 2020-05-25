module.exports = (sequelize, DataTypes) => {
  const AcademicRecord = sequelize.define(
    'AcademicRecord',
    {
      id: {
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
      tableName: 'academic_record',
    }
  );

  AcademicRecord.associate = (models) => {
    // n:m betwenn module and academic record
    models.AcademicRecord.belongsToMany(models.Module, {
      through: 'module_academic_record',
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'academicRecord_id',
      },
    });
  };
  return AcademicRecord;
};
