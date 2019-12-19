const User = require('../models/user');
const DirectorOfStudies = require('../models/directorOfStudies');
const bcrypt = require('bcrypt');
const SALTS_ROUND = 12;
const authHelper = require('../tools/authHelper');

const jwt = require('jsonwebtoken');
const propertiesReader = require('../tools/propertyReader');

exports.postLogin = (req, res, next) => {
    const {
        username,
        password
    } = req.body;
    let loadedUser;
    // check if a user exists
    User.findOne({
        where: {
            username: username
        }
    })
        .then(user => {
            if (!user) {
                const error = new Error('A user with this email could not be found.');
                error.statusCode = 401;
                throw error;
            }
            loadedUser = user;
            // if directorOfStudies exists compare the passwords to get log in
            const preparedPassword = authHelper.preparePassword(password);
            return bcrypt.compare(preparedPassword, user.password)
        })
        .then(doMatch => {
            if (doMatch) {
                const token = jwt.sign({
                    username: loadedUser.username,
                    userId: loadedUser.id
                },
                    propertiesReader.getProperty('jwt.superSecret'), {
                    expiresIn: '1h'
                }
                );
                res.status(200).json({
                    token: token,
                    userId: loadedUser.id
                });
            } else {
                const error = new Error('Wrong password!');
                error.statusCode = 401;
                throw error;
            }
        }).catch(err => {
            err.statusCode = 500;
            next(err);
        })
};

exports.postSignup = (req, res, next) => {
    const {
        username,
        password,
    } = req.body;
    if (!username) {
        return res.status(500).json({
            message: 'No username was given'
        });
    }
    if (!password) {
        return res.status(500).json({
            message: 'No password was given'
        });
    }
    User.findOne({
        where: {
            username: username
        }
    })
        .then(userExists => {
            if (userExists) {
                return res.status(403).send('Sorry: Username already exists');
            }
            // no user exists 
            const directorOfStudies = new DirectorOfStudies({});
            return directorOfStudies.save();
        })
        .then(savedDirectorOfStudies => {
            const preparedPassword = authHelper.preparePassword(password);
            bcrypt.hash(preparedPassword, SALTS_ROUND).then(
                hashedPassword => {
                    savedDirectorOfStudies.createUser({
                        username: username,
                        password: hashedPassword
                    })
                    return savedDirectorOfStudies.save()
                }
            )
        })
        .then(result => {
            return res.status(201).send('User successful created!');
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postLogout = (req, res, next) => {
    console.log('user was logged out');
} 