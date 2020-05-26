module.exports = (sequelize, DataTypes) => {
  const ModuleGroup = sequelize.define(
    'ModuleGroup',
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
      number_of_modules_to_attend: {
        type: DataTypes.INTEGER,
      },
      from_semester_number: {
        type: DataTypes.INTEGER,
      },
      to_semester_number: {
        type: DataTypes.INTEGER,
      },
    },
    {
      modelName: 'ModuleGroup',
      tableName: 'module_group',
    }
  );

  ModuleGroup.associate = (models) => {
    // 1:n betwenn module and module groupe
    models.ModuleGroup.belongsTo(models.Module, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'module_id',
      },
    });
  };
  return ModuleGroup;
};
