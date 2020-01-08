const express = require('express');
const lectures = require('../services/lectures');

const router = new express.Router();


/**
 * Create a new lecturer
 */
router.post('/', async (req, res, next) => {
  const options = {
    lecturePost: req.body['lecturePost']
  };

  try {
    const result = await lectures.postLecture(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Updates a lecture
 */
router.put('/:id', async (req, res, next) => {
  const options = {
    id: req.params['id'],
    body: req.body['body']
  };

  try {
    const result = await lectures.putLecture(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * deletes a lecture
 */
router.delete('/:id', async (req, res, next) => {
  const options = {
    id: req.params['id']
  };

  try {
    const result = await lectures.deleteLecture(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
