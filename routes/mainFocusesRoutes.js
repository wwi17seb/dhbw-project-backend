const express = require('express');
const authorize = require('../helpers/authorize');

const mainFocusesController = require('../controllers/mainFocusesController');

const router = express.Router();

router.get('/mainFocuses', authorize(), mainFocusesController.getMainFocuses);
router.post('/mainFocuses', authorize(), mainFocusesController.postMainFocuses);
router.put('/mainFocuses', authorize(), mainFocusesController.putMainFocuses);
router.delete('/mainFocuses', authorize(), mainFocusesController.deleteMainFocuses);

module.exports = router;
