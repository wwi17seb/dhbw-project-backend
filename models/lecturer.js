module.exports = (sequelize, DataTypes) => {
  const Lecturer = sequelize.define(
    'Lecturer',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      academic_title: {
        type: DataTypes.STRING,
      },
      firstname: {
        type: DataTypes.STRING,
      },
      lastname: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      salutation: {
        type: DataTypes.STRING,
      },
      phonenumber: {
        type: DataTypes.STRING,
      },
      experience: {
        type: DataTypes.STRING,
      },
      rating: {
        type: DataTypes.STRING,
      },
      is_extern: {
        type: DataTypes.BOOLEAN,
      },
      profile: {
        type: DataTypes.STRING,
      },
      cv: {
        type: DataTypes.STRING,
      },
      research: {
        type: DataTypes.STRING,
      },
    },
    {
      modelName: 'Lecturer',
      tableName: 'lecturer',
    }
  );

  Lecturer.associate = function (models) {
    // n:m between lecturer and main focus
    models.Lecturer.belongsToMany(models.MainFocus, {
      through: 'lecturer_main_focus',
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'lecturer_id',
      },
    });

    // 1:n between lecturer and director of studies
    models.Lecturer.belongsTo(models.DirectorOfStudies, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'createdBy_id',
      },
    });

    // n:m betwenn presentation and lecturer
    models.Lecturer.belongsToMany(models.Presentation, {
      through: 'presentation_lecturer',
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'presentation_id',
      },
    });
  };
  return Lecturer;
};
