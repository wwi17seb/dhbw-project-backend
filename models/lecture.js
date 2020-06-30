const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Lecture = sequelize.define(
    'Lecture',
    {
      lecture_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      workload_home: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      workload_dhbw: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      catalog_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      modelName: 'Lecture',
      tableName: 'lecture',
    }
  );

  Lecture.associate = (models) => {
    Lecture.MainFocus = models.Lecture.belongsToMany(models.MainFocus, {
      through: 'lecture_mainFocus',
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'lecture_id',
      },
    });

    // 1:n between lecture and presentation
    Lecture.Presentation = models.Lecture.hasMany(models.Presentation, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'lecture_id',
      },
    });

    // n:1 between lecture and module
    Lecture.Module = models.Lecture.belongsTo(models.Module, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'module_id',
      },
    });
  };

  // create scope for default ordering
  Lecture.addScope(
    'defaultScope',
    {
      order: [sequelize.col('catalog_id'), sequelize.col('lecture_id')],
    },
    { override: true }
  );

  return Lecture;
};
