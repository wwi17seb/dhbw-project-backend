const express = require('express');
const hello = require('../services/hello');

const router = new express.Router();


/**
 * Returns 'Hello' to the caller
 */
router.get('/', async (req, res, next) => {
  const options = {
    name: req.query['name']
  };

  try {
    const result = await hello.hello(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: 'Server Error'
    });
  }
});

module.exports = router;
