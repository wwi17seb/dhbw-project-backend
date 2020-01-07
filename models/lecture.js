const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Lecture = sequelize.define("Lecture", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
        },
        workload_home: {
            type: DataTypes.STRING,
        },
        workload_dhbw: {
            type: DataTypes.INTEGER
        },
        catalog_id: {
            type: DataTypes.STRING,
        },
        lecturer_status: {
            type: DataTypes.STRING,
        }
    }, {
        modelName: 'Lecture',
        tableName: 'lecture'
    });

    Lecture.associate = function (models) {
        models.Lecture.belongsToMany(models.Course, {
            through: 'lecture_course',
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false, 
                name: "lecture_id",
            }
        })
    };

    return Lecture;
}