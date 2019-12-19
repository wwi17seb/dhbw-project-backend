const Sequelize = require('sequelize');

const sequelize = require("../database/database");

const FieldOfStudy = sequelize.define("fieldOfStudy", {
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

module.exports = FieldOfStudy;