const Sequelize = require('sequelize');

const sequelize = require("../database/database");

const Course = sequelize.define("course", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
    }
});

module.exports = Course;