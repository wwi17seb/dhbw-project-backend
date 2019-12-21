'use strict';
module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define("Course", {
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
        modelName: 'Course',
        tableName: 'course'
    });

    Course.associate = function (models) {
        models.Course.belongsToMany(models.DirectorOfStudies, {
            through: "directorOfStudies_course" // only need a specific string to match 
        });

        models.Course.belongsToMany(models.Lecture, {
            through: 'lecture_course',
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false,
                name: "course_id",
            }
        })
    };

    return Course;
};