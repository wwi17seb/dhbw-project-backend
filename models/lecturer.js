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
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      academic_title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      salutation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phonenumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cv: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      possible_lectures: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_extern: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      allow_manipulation: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      modelName: 'Lecturer',
      tableName: 'lecturer',
    }
  );

  Lecturer.associate = (models) => {
    // n:m between lecturer and main focus
    Lecturer.MainFocus = models.Lecturer.belongsToMany(models.MainFocus, {
      through: 'lecturer_mainFocus',
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'lecturer_id',
      },
    });

    // 1:n between lecturer and presentation
    Lecturer.Presentation = models.Lecturer.hasMany(models.Presentation, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: true,
        name: 'lecturer_id',
      },
    });

    // n:1 between lecturer and directorOfStudies
    Lecturer.DirectorOfStudies = models.Lecturer.belongsTo(models.DirectorOfStudies, {
      foreignKey: {
        allowNull: true,
        name: 'createdBy_id',
      },
    });
  };

  // create scope for default ordering
  Lecturer.addScope(
    'defaultScope',
    {
      order: [sequelize.col('lastname'), sequelize.col('firstname')],
    },
    { override: true }
  );

  return Lecturer;
};
