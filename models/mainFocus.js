module.exports = (sequelize, DataTypes) => {
  const MainFocus = sequelize.define(
    'MainFocus',
    {
      mainFocus_id: {
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
      modelName: 'MainFocus',
      tableName: 'mainFocus',
    }
  );

  MainFocus.associate = (models) => {
    models.MainFocus.belongsToMany(models.Lecturer, {
      through: 'lecturer_main_focus',
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'mainFocus_id',
      },
    });

    models.MainFocus.belongsToMany(models.Lecture, {
      through: 'lecture_main_focus',
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'main_focus_id',
      },
    });
  };
  return MainFocus;
};
