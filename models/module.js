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
        // todo
    };
    return Module;
}