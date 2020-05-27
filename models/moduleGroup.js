module.exports = (sequelize, DataTypes) => {
  const ModuleGroup = sequelize.define(
    'ModuleGroup',
    {
      moduleGroup_id: {
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
      tableName: 'moduleGroup',
    }
  );

  ModuleGroup.associate = (models) => {
    // 1:n between module and moduleGroup
    models.ModuleGroup.hasMany(models.Module, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'moduleGroup_id',
      },
    });

    // 1:n between module and majorSubject
    models.ModuleGroup.belongsTo(models.MajorSubject, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'majorSubject_id',
      },
    });
  };
  return ModuleGroup;
};
