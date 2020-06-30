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
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(64),
        is: /^[0-9a-f]{64}$/i,
        allowNull: false,
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      misc: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      password_change_required: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      modelName: 'DirectorOfStudies',
      tableName: 'directorOfStudies',
      name: {
        singular: 'DirectorOfStudies',
        plural: 'DirectorsOfStudies',
      },
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

  const hashPw = async (password) => {
    return await authService.hashPassword(password);
  };

  // Before Create
  DirectorOfStudies.beforeCreate(async (DirectorOfStudies) => {
    DirectorOfStudies.password = await hashPw(DirectorOfStudies.password);

    return DirectorOfStudies;
  });

  // Before Update
  DirectorOfStudies.beforeBulkUpdate(async (DirectorOfStudies) => {
    if (DirectorOfStudies.attributes.password) {
      DirectorOfStudies.attributes.password = await hashPw(DirectorOfStudies.attributes.password);
    }
  });

  // create scope for default ordering
  DirectorOfStudies.addScope(
    'defaultScope',
    {
      order: sequelize.col('directorOfStudies_id'),
    },
    { override: true }
  );

  return DirectorOfStudies;
};
