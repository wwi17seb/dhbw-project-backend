module.exports = (sequelize, DataTypes) => {
    const Module = sequelize.define("Module", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        catalod_id: {
            type: DataTypes.STRING,
        }
    }, {
        modelName: 'Module',
        tableName: 'module'
    });

    Module.associate = function (models) {
        // n:m betwenn module and main lecturer
        models.Module.belongsToMany(models.Lecturer, {
            through: "lecturer_module",
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false,
                name: "module_id",
            },
        });

        // n:m betwenn module and academic record
        models.Module.belongsToMany(models.AcademicRecord, {
            through: "module_academic_record",
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false,
                name: "module_id",
            },
        })
    }
    return Module;
}