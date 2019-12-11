const PropertiesReader = require('properties-reader');
const prop = PropertiesReader('./env/app.properties');

// gets property from ./env/app.properties
getProperty = (pty) => { return prop.get(pty); }

module.exports = {
    getProperty
}