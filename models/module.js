module.exports = (sequelize, DataTypes) => {
  const Module = sequelize.define(
    'Module',
    {
      module_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      requirements: {
        type: DataTypes.STRING,
      },
      ects: {
        type: DataTypes.INTEGER,
      },
      catalog_id: {
        type: DataTypes.STRING,
      },
    },
    {
      modelName: 'Module',
      tableName: 'module',
    }
  );

  Module.associate = (models) => {
    // 1:n between module and lecture
    models.Module.hasMany(models.Lecture, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'module_id',
      },
    });

    // n:m between module and academic record
    models.Module.belongsToMany(models.AcademicRecord, {
      through: 'module_academicRecord',
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'module_id',
      },
    });

    // n:1 between module and modulegroup
    models.Module.belongsTo(models.ModuleGroup, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'moduleGroup_id',
      },
    });
  };
  return Module;
};
