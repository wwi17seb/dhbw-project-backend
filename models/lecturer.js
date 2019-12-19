const Sequelize = require('sequelize');

const sequelize = require("../database/database");

const Lecturer = sequelize.define("lecturer", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    academic_title: {
        type: Sequelize.STRING,
    },
    firstname: {
        type: Sequelize.STRING
    },
    lastname: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    salutation: {
        type: Sequelize.STRING
    },
    phonenumber: {
        type: Sequelize.STRING
    },
    experience: {
        type: Sequelize.STRING
    },
    rating: {
        type: Sequelize.STRING
    },
    is_extern: {
        type: Sequelize.BOOLEAN
    }
});

module.exports = Lecturer;