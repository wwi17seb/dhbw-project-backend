const authService = require('../services/authService');
const userService = require('../services/userService');

const responseHelper = require("../helpers/responseHelper");

const ERROR_MESSAGE_AUTH_FAILED = "AUTH FAILED";

exports.postLogin = (req, res, next) => {
    const {
        username,
        password
    } = req.body;
    let loadedUser;
    // check if a user exists
    userService.getUserByUsername(username)
        .then(user => {
            if (!user) {
                return responseHelper(res, 401, ERROR_MESSAGE_AUTH_FAILED);
            }
            loadedUser = user;
            return loadedUser;
        })
        .then((user) => {
            // if user exists compare the passwords to get log in
            return authService.verifyPassword(password, user.password);
        })
        .then(doMatch => {
            if (doMatch) {
                const token = authService.generateToken(loadedUser);
                responseHelper(res, 200, 'Token generated!', {token, userId: loadedUser.id});
            } else {
                responseHelper(res, 401, ERROR_MESSAGE_AUTH_FAILED);
            }
        }).catch(err => {
            err.statusCode = 500;
            next(err);
        })
};

exports.postSignup = async (req, res, next) => {
    const {
        username,
        password,
    } = req.body;
    if (!username) {
        responseHelper(res, 400, 'No username was given!');
    }
    if (!password) {
        responseHelper(res, 400, 'No password was given!');
    }

    const userExists = await userService.getUserByUsername(username);
    if (userExists) {
        responseHelper(res, 400, 'Username already exists');
    }

    const userToCreate = { username, password };
    const user = await userService.createUser(userToCreate);
    const token = authService.generateToken(user);
    responseHelper(res, 201, 'Successful', { token, userId: user.id, username: user.username });
};

exports.postLogout = (req, res, next) => {
    responseHelper(res, 200, 'Not yet implemented!');
};