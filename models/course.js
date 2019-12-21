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
            /*               
            only need a specific string to match 
            this string is also the table
              */
            through: "directorOfStudies_course"
        });

        // n:m betwenn course and lecturer
        models.Course.belongsToMany(models.Lecture, {
            through: 'lecture_course',
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false,
                name: "course_id",
            }
        })

        // 1:n between course and semester
        models.Course.hasMany(models.Semester, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false,
                name: "course_id",
            },
        });
    };

    return Course;
};