const Sequelize = require('sequelize');

const sequelize = require("../database/database");

const AcademicRecord = sequelize.define("academicRecord", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    abbreviation: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING, 
    },
    rated: {
        type: Sequelize.BOOLEAN
    }
});

module.exports = AcademicRecord;