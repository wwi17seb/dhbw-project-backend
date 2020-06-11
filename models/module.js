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
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ects: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      catalog_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      number_of_lectures_to_attend: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      requirements: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      modelName: 'Module',
      tableName: 'module',
    }
  );

  Module.associate = (models) => {
    // 1:n between module and lecture
    Module.Lecture = models.Module.hasMany(models.Lecture, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'module_id',
      },
    });

    // n:m between module and academic record
    Module.AcademicRecord = models.Module.belongsToMany(models.AcademicRecord, {
      through: 'module_academicRecord',
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'module_id',
      },
    });

    // n:1 between module and modulegroup
    Module.ModuleGroup = models.Module.belongsTo(models.ModuleGroup, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'moduleGroup_id',
      },
    });
  };
  return Module;
};
