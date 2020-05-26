module.exports = (sequelize, DataTypes) => {
  const MajorSubject = sequelize.define(
    'MajorSubject',
    {
      id: {
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
      modelName: 'MajorSubject',
      tableName: 'major_subject',
    }
  );

  MajorSubject.associate = (models) => {
    // 1:n between major subject and course
    models.MajorSubject.hasMany(models.Course, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'majorSubject_id',
      },
    });
  };
  return MajorSubject;
};
