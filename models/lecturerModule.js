module.exports = (sequelize, DataTypes) => {
  const Lecturer_Module = sequelize.define(
    "Lecturer_Module",
    {
      lecturer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      module_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      modelName: "Lecturer_Module",
      tableName: "lecturer_module",
    }
  );

  Lecturer_Module.associate = (models) => {
    /*  models.Lecturer.belongsTo(models.Module, {
      through: "lecturer_module",
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
        name: "lecturer_id",
      },
    });

    // n:m between lecturer and main focus
    models.Module.belongsToMany(models.Lecturer, {
      through: "lecturer_module",
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
        name: "module_id",
      },
    });*/
  };
  return Lecturer_Module;
};
