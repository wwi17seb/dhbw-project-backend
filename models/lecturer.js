module.exports = (sequelize, DataTypes) => {
  const Lecturer = sequelize.define(
    'Lecturer',
    {
      lecturer_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      academic_title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      salutation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phonenumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      experience: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_extern: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      profile: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cv: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      research: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      modelName: 'Lecturer',
      tableName: 'lecturer',
    }
  );

  Lecturer.associate = (models) => {
    // n:m between lecturer and main focus
    models.Lecturer.belongsToMany(models.MainFocus, {
      through: 'lecturer_mainFocus',
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'lecturer_id',
      },
    });

    // 1:n between lecturer and presentation
    models.Lecturer.hasMany(models.Presentation, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'lecturer_id',
      },
    });

    // 1:n between lecturer and directorOfStudies
    models.Lecturer.belongsTo(models.DirectorOfStudies, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'createdBy_id',
      },
    });

    // TODO:
    // 1: 0,1 between director of studies and lecturer
    //models.Lecturer.belongsTo(models.DirectorOfStudies, {
    //   onDelete: 'CASCADE',
    //   foreignKey: {
    //     allowNull: true,
    //     name: 'directorOfStudies_id',
    //   },
    // });
  };
  return Lecturer;
};
