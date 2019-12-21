const authService = require('../services/auth');

const userService = require('../services/user');

const directorOfStudiesService = require('../services/directorOfStudies');

// const models = require('../models');

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
                const error = new Error('A user with this email could not be found.');
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
                const error = new Error('Wrong password!');
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
        return res.status(500).json({
            message: 'No username was given'
        });
    }
    if (!password) {
        return res.status(500).json({
            message: 'No password was given'
        });
    }

    const userExists = await userService.getUserByUsername(username);
    console.log('userExists', userExists);
    if (userExists) {
        return res.status(403).send('Sorry: Username already exists');
    }
    const hashedPassword = await authService.hashPassword(password);

    const userToCreate = {
        username: username,
        password: hashedPassword
    };
    const lecturerToCreate = {};
    const Dos = await directorOfStudiesService.createDirectorOfStudies(userToCreate, lecturerToCreate);

    res.status(201).send({
        message: "successfull",
        directorOfStudies: Dos
    })
};

exports.postLogout = (req, res, next) => {
    console.log('user was logged out');
}