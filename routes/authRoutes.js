const express = require('express');
const authorize = require('../helpers/authorize');

const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.postLogin);
router.post('/signup', authController.postSignup);
router.post('/logout', authorize(), authController.postLogout);

router.post('/test', authorize(), (req, res) => {
    // req.token is the verified and decoded token
    res.json({ status: 200, message: 'Successful', payload: { token: req.token } });
});

module.exports = router;