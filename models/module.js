const Sequelize = require('sequelize');

const sequelize = require("../database/database");

const Module = sequelize.define("module", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    catalod_id: {
        type: Sequelize.STRING, 
    }
});

module.exports = Module;