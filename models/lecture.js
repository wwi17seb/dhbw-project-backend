const Sequelize = require('sequelize');

const sequelize = require("../database/database");

const Lecture = sequelize.define("lecture", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
    },
    workload_home: {
        type: Sequelize.STRING, 
    },
    workload_dhbw: {
        type: Sequelize.NUMBER,
    },
    catalog_id: {
        type: Sequelize.STRING,
    },
    lecturer_status:{
        type: Sequelize.STRING,
    } 
});

module.exports = Lecture;