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
        type: DataTypes.INTEGER,
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
    models.Lecture.belongsToMany(models.MainFocus, {
      through: 'lecture_main_focus',
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'lecture_id',
      },
    });
  };

  return Lecture;
};
