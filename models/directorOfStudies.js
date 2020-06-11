'use strict';

const authService = require('../services/authService');
const authHelper = require('../helpers/authHelper');

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
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(64),
        is: /^[0-9a-f]{64}$/i,
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      misc: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      modelName: 'DirectorOfStudies',
      tableName: 'directorOfStudies',
    }
  );

  DirectorOfStudies.associate = (models) => {
    // n:m between DirectorOfStudies to Course
    DirectorOfStudies.Course = models.DirectorOfStudies.belongsToMany(models.Course, {
      through: 'directorOfStudies_course',
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'directorOfStudies_id',
      },
    });

    // 1:n betwenn director of studies and presentation
    DirectorOfStudies.Presentation = models.DirectorOfStudies.hasMany(models.Presentation, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'createdBy_id',
      },
    });

    // 1:n between director of studies and lecturer
    DirectorOfStudies.Lecturer = models.DirectorOfStudies.hasMany(models.Lecturer, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: true,
        name: 'createdBy_id',
      },
    });
  };

  // Before Create
  DirectorOfStudies.beforeCreate((DirectorOfStudies) => {
    return authService.hashPassword(DirectorOfStudies.password).then((hashedPw) => {
      DirectorOfStudies.password = hashedPw;
    });
  });

  return DirectorOfStudies;
};
