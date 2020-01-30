const express = require('express');

const authController = require('../controllers/lecturerController');

const router = express.Router();

router.post('/lecturer', authController.postLecturer);

module.exports = router;