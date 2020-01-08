const express = require('express');
const courses = require('../services/courses');

const router = new express.Router();


/**
 * Get all courses, including ID, name, director, links
 */
router.get('/', async (req, res, next) => {
  const options = {
    directorOfStudies: req.query['directorOfStudies']
  };

  try {
    const result = await courses.getCourses(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Create a new course
 */
router.post('/', async (req, res, next) => {
  const options = {
    body: req.body['body']
  };

  try {
    const result = await courses.postCourse(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Update one course
 */
router.put('/:courseID', async (req, res, next) => {
  const options = {
    courseID: req.params['courseID'],
    body: req.body['body']
  };

  try {
    const result = await courses.updateCourse(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Delete one course
 */
router.delete('/:courseID', async (req, res, next) => {
  const options = {
    courseID: req.params['courseID']
  };

  try {
    const result = await courses.deleteCourse(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
