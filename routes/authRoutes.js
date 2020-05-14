const express = require('express');
const authorize = require('../helpers/authorize');

const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.postLogin);

router.post('/signup', authController.postSignup);

router.post('/logout', authorize(), authController.postLogout);


router.post('/test-login', (req, res) => {
    res.json({ token: require('../services/authService').generateToken(req.body) });
});
router.post('/test', authorize(), (req, res) => {
    // req.token is the verified and decoded token
    res.json({ msg: 'successful', token: req.token });
});

module.exports = router;