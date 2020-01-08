const express = require('express');
const semesterview = require('../services/semesterview');

const router = new express.Router();


/**
 * Get all modules of all semesters of a course
 */
router.get('/', async (req, res, next) => {
  const options = {
  };

  try {
    const result = await semesterview.getSemesterview(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Updates a course
 */
router.put('/:id', async (req, res, next) => {
  const options = {
    id: req.params['id'],
    body: req.body['body']
  };

  try {
    const result = await semesterview.putCourse(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
