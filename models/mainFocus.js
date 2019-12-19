const Sequelize = require('sequelize');

const sequelize = require("../database/database");

const MainFocus = sequelize.define("mainFocus", {
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

module.exports = MainFocus;