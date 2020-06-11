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
      },
      workload_home: {
        type: DataTypes.STRING,
      },
      workload_dhbw: {
        type: DataTypes.STRING,
      },
      catalog_id: {
        type: DataTypes.STRING,
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

  return Lecture;
};
