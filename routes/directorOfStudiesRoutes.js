const express = require('express');
const authorize = require('../helpers/authorize');

const directorOfStudiesController = require('../controllers/directorOfStudiesController');

const router = express.Router();

router.put('/changePassword', directorOfStudiesController.putChangePassword);
router.get('/directorOfStudies', authorize(), directorOfStudiesController.getDirectorOfStudies);
router.put('/directorOfStudies', authorize(), directorOfStudiesController.putDirectorOfStudies);

module.exports = router;
