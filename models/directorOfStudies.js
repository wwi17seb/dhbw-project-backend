'use strict';
module.exports = (sequelize, DataTypes) => {
  const DirectorOfStudies = sequelize.define(
    'DirectorOfStudies',
    {
      directorOfStudies_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      misc: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      lecturer_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      modelName: 'DirectorOfStudies',
      tableName: 'directorOfStudies',
    }
  );

  DirectorOfStudies.associate = (models) => {
    // 1:1 between director of studies and account
    models.DirectorOfStudies.belongsTo(models.Account, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'account_id',
      },
    });

    // n:m between DirectorOfStudies to Course
    models.DirectorOfStudies.belongsToMany(models.Course, {
      through: 'directorOfStudies_course',
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'directorOfStudies_id',
      },
    });

    // 1:n betwenn director of studies and presentation
    models.DirectorOfStudies.hasMany(models.Presentation, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'createdBy_id',
      },
    });

    // 1:n between director of studies and lecturer
    models.DirectorOfStudies.hasMany(models.Lecturer, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'createdBy_id',
      },
    });

    // TODO:
    // 1:0,1 between director of studies and lecturer
    //models.DirectorOfStudies.belongsTo(models.Lecturer, {
    //   onDelete: 'CASCADE',
    //   foreignKey: {
    //     allowNull: true,
    //     name: 'lecturer_id',
    //   },
    // });
  };

  return DirectorOfStudies;
};
