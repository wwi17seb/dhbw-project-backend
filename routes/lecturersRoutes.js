const express = require('express');
const authorize = require('../helpers/authorize');

const lecturersController = require('../controllers/lecturersController');
const lecturerCVsController = require('../controllers/lecturerCVsController');

const router = express.Router();

router.get('/lecturers', authorize(), lecturersController.getLecturers);
router.post('/lecturers', authorize(), lecturersController.postLecturers);
router.put('/lecturers', authorize(), lecturersController.putLecturers);
router.delete('/lecturers', authorize(), lecturersController.deleteLecturers);

router.post('/lecturerCV', authorize(), lecturerCVsController.putLecturerCV);
router.get('/lecturerCV', authorize(), lecturerCVsController.getLecturerCV);
router.get('/lecturerCV', authorize(), lecturerCVsController.deleteLecturerCV);

module.exports = router;
