const express = require('express');
const authorize = require('../helpers/authorize');

const userController = require('../controllers/userController');

const router = express.Router();

router.post('/register', authorize(), userController.register);
router.put('/changePassword', authorize(), userController.putChangePassword);
router.put('/directorOfStudies', authorize(), userController.putDirectorOfStudies);

module.exports = router;
