const authService = require('../services/authService');

const userService = require('../services/userService');

const directorOfStudiesService = require('../services/directorOfStudiesService');

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
                const error = new Error(ERROR_MESSAGE_AUTH_FAILED);
                error.statusCode = 401;
                throw error;
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
                res.status(200).json({
                    token: token,
                    userId: loadedUser.id
                });
            } else {
                const error = new Error(ERROR_MESSAGE_AUTH_FAILED);
                error.statusCode = 401;
                throw error;
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
        return res.status(400).json({
            message: 'No username was given'
        });
    }
    if (!password) {
        return res.status(400).json({
            message: 'No password was given'
        });
    }

    const userExists = await userService.getUserByUsername(username);
    if (userExists) {
        return res.status(400).json({
            message: 'Username already exists'
        });
    }
    const hashedPassword = await authService.hashPassword(password);

    const userToCreate = {
        username: username,
        password: hashedPassword
    };
    const lecturerToCreate = {};
    const Dos = await directorOfStudiesService.createDirectorOfStudies(userToCreate, lecturerToCreate);

    res.status(201).json({
        message: "Successful",
        directorOfStudies: Dos
    });
};

exports.postLogout = (req, res, next) => {

};