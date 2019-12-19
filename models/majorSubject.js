const Sequelize = require('sequelize');

const sequelize = require("../database/database");

const MajorSubject = sequelize.define("majorSubject", {
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

module.exports = MajorSubject;