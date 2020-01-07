module.exports = (sequelize, DataTypes) => {
    const ModuleGroup = sequelize.define("ModuleGroup", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
        },
        number_of_modules_to_attend: {
            type: DataTypes.INTEGER
        },
        from_semester_number: {
            type: DataTypes.INTEGER
        },
        to_semester_number: {
            type: DataTypes.INTEGER
        }
    }, {
        modelName: 'ModuleGroup',
        tableName: 'module_group'
    });

    ModuleGroup.associate = function (models) {
        // todo
    };
    return ModuleGroup;
}