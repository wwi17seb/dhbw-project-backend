const jwt = require('jsonwebtoken');
const propertiesReader = require('../tools/propertyReader');
const bcrypt = require('bcrypt');

const authHelper = require('../tools/authHelper');
const SALTS_ROUND = 12;

module.exports.generateToken = (user) => {
    return jwt.sign({
            username: user.username,
            userId: user.id
        },
        propertiesReader.getProperty('jwt.superSecret'), {
            expiresIn: '1h'
        }
    );
}

module.exports.verifyPassword = (enteredPassword, userPassword) => {
    const preparedPassword = preparePassword(enteredPassword);
    return bcrypt.compare(preparedPassword, userPassword)
}

module.exports.hashPassword = (passwordToHash) => {
    const preparedPassword = preparePassword(passwordToHash);
    return bcrypt.hash(preparedPassword, SALTS_ROUND);
}

function preparePassword(password) {
    return authHelper.preparePassword(password);
}