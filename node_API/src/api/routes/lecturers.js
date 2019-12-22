const express = require('express');
const lecturers = require('../services/lecturers');

const router = new express.Router();


/**
 * Get all a list of lecturers, sorted by parameters
 */
router.get('/', async (req, res, next) => {
  const options = {
    experience: req.query['experience'],
    comment: req.query['comment'],
    firstname: req.query['firstname'],
    lastname: req.query['lastname'],
    extern: req.query['extern']
  };

  try {
    const result = await lecturers.getLecturers(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Create a new lecturer
 */
router.post('/', async (req, res, next) => {
  const options = {
    lecturersPost: req.body['lecturersPost']
  };

  try {
    const result = await lecturers.postLecturers(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Updates a lecturer
 */
router.put('/:id', async (req, res, next) => {
  const options = {
    id: req.params['id'],
    body: req.body['body']
  };

  try {
    const result = await lecturers.putLecturer(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * deletes a lecturer
 */
router.delete('/:id', async (req, res, next) => {
  const options = {
    id: req.params['id']
  };

  try {
    const result = await lecturers.deleteLecturer(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
