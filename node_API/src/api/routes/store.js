const express = require('express');
const store = require('../services/store');

const router = new express.Router();


/**
 * Returns a map of status codes to quantities
 */
router.get('/inventory', async (req, res, next) => {
  const options = {
  };

  try {
    const result = await store.getInventory(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: 'Server Error'
    });
  }
});

/**
 * Place an order for a pet
 */
router.post('/order', async (req, res, next) => {
  const options = {
    body: req.body['body']
  };

  try {
    const result = await store.placeOrder(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * For valid response try integer IDs with value >= 1 and <= 
 * 10.         Other values will generated exceptions
 */
router.get('/order/:orderId', async (req, res, next) => {
  const options = {
    orderId: req.params['orderId']
  };

  try {
    const result = await store.getOrderById(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * For valid response try integer IDs with positive integer 
 * value.         Negative or non-integer values will generate 
 * API errors
 */
router.delete('/order/:orderId', async (req, res, next) => {
  const options = {
    orderId: req.params['orderId']
  };

  try {
    const result = await store.deleteOrder(options);
    res.status(200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
