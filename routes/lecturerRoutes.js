const express = require('express');

const lecturerController = require('../controllers/lecturerController');

const router = express.Router();

router.post('/lecturer', lecturerController.postLecturer);

module.exports = router;