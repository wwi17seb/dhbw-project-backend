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
        allowNull: false,
      },
      number_of_modules_to_attend: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      from_semester_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      to_semester_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      modelName: 'ModuleGroup',
      tableName: 'moduleGroup',
    }
  );

  ModuleGroup.associate = (models) => {
    // 1:n between module and moduleGroup
    ModuleGroup.Module = models.ModuleGroup.hasMany(models.Module, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'moduleGroup_id',
      },
    });

    // 1:n between module and majorSubject
    ModuleGroup.MajorSubject = models.ModuleGroup.belongsTo(models.MajorSubject, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'majorSubject_id',
      },
    });
  };

  // create scope for default ordering
  ModuleGroup.addScope(
    'defaultScope',
    {
      order: sequelize.col('moduleGroup_id'),
    },
    { override: true }
  );

  return ModuleGroup;
};
