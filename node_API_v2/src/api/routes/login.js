const express = require('express');
const login = require('../services/login');

const router = new express.Router();


/**
 * 
 */
router.post('/', async (req, res, next) => {
  const options = {
    body: req.body['body']
  };

  try {
    const result = await login.login(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
