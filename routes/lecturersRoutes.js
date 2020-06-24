const express = require('express');
const authorize = require('../helpers/authorize');

const lecturersController = require('../controllers/lecturersController');

const router = express.Router();

router.get('/lecturers', authorize(), lecturersController.getLecturers);
router.post('/lecturers', authorize(), lecturersController.postLecturers);
router.put('/lecturers', authorize(), lecturersController.putLecturers);
router.delete('/lecturers', authorize(), lecturersController.deleteLecturers);

router.get('/lecturerCV', authorize(), lecturersController.getLecturerCV);

module.exports = router;
