const authService = require('../services/authService');

const userService = require('../services/userService');

const directorOfStudiesService = require('../services/directorOfStudiesService');

const ERROR_MESSAGE_AUTH_FAILED = "AUTH FAILED";

const responseHelper = require("../tools/responseHelper");

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
                responseHelper(res, 200, 'Token generated!', {token: token, userId: loadedUser.id});
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
    const hashedPassword = await authService.hashPassword(password);

    const userToCreate = {
        username: username,
        password: hashedPassword
    };
    const lecturerToCreate = {};
    const Dos = await directorOfStudiesService.createDirectorOfStudies(userToCreate, lecturerToCreate);
    responseHelper(res, 201, 'Successful', {directorOfStudies: Dos});
};

exports.postLogout = (req, res, next) => {
    responseHelper(res, 200, 'Not yet implemented!');
};