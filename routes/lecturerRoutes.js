const express = require('express');
const authorize = require('../helpers/authorize');

const lecturerController = require('../controllers/lecturerController');

const router = express.Router();

router.post('/lecturer', authorize(), lecturerController.postLecturer);

module.exports = router;