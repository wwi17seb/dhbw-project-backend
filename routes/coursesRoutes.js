const express = require('express');
const authorize = require('../helpers/authorize');

const coursesController = require('../controllers/coursesController');

const router = express.Router();

router.get('/courses', authorize(), coursesController.getCourses);
router.post('/courses', authorize(), coursesController.postCourses);
router.put('/courses', authorize(), coursesController.putCourses);
router.delete('/courses', authorize(), coursesController.deleteCourses);

module.exports = router;
