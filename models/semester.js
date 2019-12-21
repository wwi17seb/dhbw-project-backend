module.exports = (sequelize, DataTypes) => {
    const Semester = sequelize.define("Semester", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
        },
        number: {
            type: DataTypes.STRING,
        },
        start_date: {
            type: DataTypes.DATE,
        },
        end_date: {
            type: DataTypes.DATE,
        }
    }, {
        modelName: 'Semester',
        tableName: 'semester'
    });

    Semester.associate = function (models) {
        // todo
    };
    return Semester;
}