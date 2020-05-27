'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      account_id: {
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
        type: DataTypes.STRING,
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      modelName: 'User',
      tableName: 'account',
    }
  );

  User.associate = (models) => {
    // 1:1 between user and director of studies
    models.User.hasOne(models.DirectorOfStudies, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'account_id',
      },
    });
  };

  return User;
};
