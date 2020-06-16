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
        allowNull: false,
      },
    },
    {
      modelName: 'MainFocus',
      tableName: 'mainFocus',
      name: {
        plural: 'MainFocuses',
      },
    }
  );

  MainFocus.associate = (models) => {
    MainFocus.Lecturer = models.MainFocus.belongsToMany(models.Lecturer, {
      through: 'lecturer_mainFocus',
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'mainFocus_id',
      },
    });

    MainFocus.Lecture = models.MainFocus.belongsToMany(models.Lecture, {
      through: 'lecture_mainFocus',
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'mainFocus_id',
      },
    });
  };
  return MainFocus;
};
