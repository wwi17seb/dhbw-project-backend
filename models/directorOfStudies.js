const Sequelize = require('sequelize');

const sequelize = require("../database/database");

const DirectorOfStudies = sequelize.define("directorOfStudies", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = DirectorOfStudies;