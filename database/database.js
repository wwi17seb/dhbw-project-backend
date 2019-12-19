const Sequelize = require("sequelize").Sequelize;
const propertiesReader = require('../tools/propertyReader');

const sequelize = new Sequelize(propertiesReader.getProperty('server.database') , propertiesReader.getProperty('server.user'), propertiesReader.getProperty('server.password'), {
    dialect: propertiesReader.getProperty('server.dialect'),
    host: propertiesReader.getProperty('server.host')
});

module.exports = sequelize; 
