const User = require('../models/user');
const DirectorOfStudies = require('../models/directorOfStudies');

exports.postLogin = (req, res, next) => {

    const { username, password } = req.body;

    if (!username) {
        const err = new Error;
        err.status = 404;
        err.message = "Username not given"
        return err;
    }
    if (!password) {
        const err = new Error;
        err.status = 404;
        err.message = "Password not given"
        return err;
    }

    // everything ok with pw and user

    const user = new User({
        username: username
        , password: password
    });

    user.save().then(user => {
        user.createDirectorOfStudy();
        user.save();
    });

    console.log('user logged in');
}

exports.postSignup = (req, res, next) => {
    console.log('body', req.body);
    const { username, password } = req.body;

    // everything ok with pw and user

    const user = new User({
        username: username
        , password: password
    });
    user.save().then(user => {
        console.log('user created:', user);
        return res.send({ message: 'user created', user: user })
    }).catch(err => {
        console.log(err);
    })
    console.log('user signed up');
}

exports.postLogout = (req, res, next) => {
    console.log('user was logged out');
} 