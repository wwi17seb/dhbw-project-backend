'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};
const propertiesReader = require('../helpers/propertyReader');
const PATH_MODELS = '../models';

const sequelize = new Sequelize(
  propertiesReader.getProperty('server.database'),
  propertiesReader.getProperty('server.user'),
  propertiesReader.getProperty('server.password'),
  {
    dialect: propertiesReader.getProperty('server.dialect'),
    host: propertiesReader.getProperty('server.host'),
    port: propertiesReader.getProperty('server.port'),
    logging: false,
  }
);

fs.readdirSync(__dirname + '/' + PATH_MODELS)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    const model = sequelize['import'](path.join(PATH_MODELS, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
