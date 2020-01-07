const sha3_512 = require('js-sha3').sha3_512;
const propertiesReader = require('./propertyReader');

exports.preparePassword = function (password) {
    const passwordWithPepper = password + propertiesReader.getProperty('pepper');
    return sha3_512(passwordWithPepper);
};