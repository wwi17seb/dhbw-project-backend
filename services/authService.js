const jwt = require('jsonwebtoken');
const propertiesReader = require('../tools/propertyReader');
const bcrypt = require('bcryptjs');

const authHelper = require('../tools/authHelper');
const SALTS_ROUND = 12;

module.exports.generateToken = (user) => {
    return jwt.sign({
            username: user.username,
            userId: user.id
        },
        propertiesReader.getProperty('jwt.superSecret'), {
            expiresIn: '12h'
        }
    );
}

module.exports.verifyToken = (token) => {
    try {
        return jwt.verify(token, propertiesReader.getProperty('jwt.superSecret'));
    } catch (err) {
        return null;
    }
}

module.exports.decodeToken = (token) => {
    return jwt.decode(token);
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