const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.post('/login', authController.postLogin);

router.post('/signup', authController.postSignup);

router.post('/logout', authController.postLogout);

module.exports = router;