const express = require('express');
const authorize = require('../helpers/authorize');

const coursesController = require('../controllers/coursesController');

const router = express.Router();

router.get('/courses', authorize(), coursesController.getCourses);
router.post('/courses', authorize(), coursesController.postCourses);
router.put('/courses/:id', authorize(), coursesController.putCourses);
router.delete('/courses/:id', authorize(), coursesController.deleteCourses);

module.exports = router;
