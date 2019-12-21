'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};
const propertiesReader = require('../tools/propertyReader');
const PATH_MODELS = '../models';

// https://sequelize.org/master/manual/models-definition.html#configuration
//database wide options
const options = {
    define: {
        //prevent sequelize from pluralizing table names
        freezeTableName: true
    }
}

const sequelize = new Sequelize(
    propertiesReader.getProperty('server.database'),
    propertiesReader.getProperty('server.user'),
    propertiesReader.getProperty('server.password'), {
        dialect: propertiesReader.getProperty('server.dialect'),
        host: propertiesReader.getProperty('server.host')
    }, options);

fs
    .readdirSync(__dirname + '/' + PATH_MODELS)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => { 
        console.log('file', file);
        const model = sequelize['import'](path.join(PATH_MODELS, file));
        console.log('model', model);
        db[model.name] = model;
    });


Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        console.log('asso', db[modelName]);
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;