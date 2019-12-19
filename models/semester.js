const Sequelize = require('sequelize');

const sequelize = require("../database/database");

const Semester = sequelize.define("semester", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
    },
    number: {
        type: Sequelize.STRING, 
    },
    start_date: {
        type: Sequelize.DATE,
    },
    end_date: {
        type: Sequelize.DATE,
    }
});

module.exports = Semester;