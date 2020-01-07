module.exports = (sequelize, DataTypes) => {
    const MainFocus = sequelize.define("MainFocus", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
        }
    }, {
        modelName: 'MainFocus',
        tableName: 'main_focus'
    });

    MainFocus.associate = function (models) {
        models.MainFocus.belongsToMany(models.Lecturer, {
            through: "lecturer_main_focus",
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false,
                name: "mainFocus_id",
            },
        });
    };
    return MainFocus;
}