const Sequelize = require('sequelize');

const sequelize = require("../database/database");

const ModuleGroup = sequelize.define("moduleGroup", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
    },
    number_of_modules_to_attend: {
        type: Sequelize.NUMBER
    },
    from_semester_number: {
        type: Sequelize.NUMBER
    },
    to_semester_number: {
        type: Sequelize.NUMBER
    }
});

module.exports = ModuleGroup;