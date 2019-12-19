const Sequelize = require('sequelize');

const sequelize = require("../database/database");

const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        unique: true
    },
    password: Sequelize.STRING
});

module.exports = User;