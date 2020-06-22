const express = require('express');
const authorize = require('../helpers/authorize');

const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.postLogin);
router.post('/signup', authController.postSignup);
router.post('/logout', authorize(), authController.postLogout);

module.exports = router;
