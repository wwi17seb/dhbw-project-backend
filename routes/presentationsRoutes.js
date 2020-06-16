const express = require('express');
const authorize = require('../helpers/authorize');

const presentationsController = require('../controllers/presentationsController');

const router = express.Router();

router.get('/presentations/', authorize(), presentationsController.getPresentations);
router.post('/presentations/', authorize(), presentationsController.postPresentations);
router.put('/presentations/', authorize(), presentationsController.putPresentations);
router.delete('/presentations/', authorize(), presentationsController.deletePresentations);

module.exports = router;
